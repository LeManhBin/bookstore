import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  fetchCheckEmailUser,
  fetchOtp,
  fetchRegisterUser,
} from "../../../apis/registerApi";
import {
  fetchAllDataUser,
  fetchCreateUser,
  fetchDataUserById,
  fetchDeleteUser,
  fetchUpdateAddress,
  fetchUpdatePassword,
  fetchUpdateUser,
} from "../../../apis/userApi";
import {
  KEY_ACCESS_TOKEN,
  KEY_IS_LOGGER,
  KEY_USER,
} from "../../../constants/config";
import * as Jwt from "jsonwebtoken";
import { fetchInforMe, fetchLoginUser } from "../../../apis/loginApi";
import { fetchResetPassword } from "../../../apis/resetPasswordApi";

const initialState = {
  allUser: [],
  // user: localStorage.getItem(KEY_USER)
  //   ? JSON.parse(localStorage.getItem(KEY_USER))
  //   : {},
  user: {},
  userById: {},
  isLoading: false,
  isLoadingCreate: false,
  isOtp: false,
  otp: "",
  accessToken: localStorage.getItem(KEY_ACCESS_TOKEN) || "",
  isLogged: JSON.parse(localStorage.getItem(KEY_IS_LOGGER)) || false,
  errors: {},
};

export const actFetchAllUser = createAsyncThunk(
  "user/actFetchAllUser",
  async () => {
    const data = await fetchAllDataUser();
    return data || [];
  }
);

export const actFetchUserById = createAsyncThunk(
  "user/actFetchUserById",
  async (id) => {
    const data = await fetchDataUserById(id);
    return data || {};
  }
);

export const actFetchRegister = createAsyncThunk(
  "user/actFetchRegister",
  async (data) => {
    const dataRegister = await fetchCheckEmailUser(data);
    return dataRegister;
  }
);

export const actFetchCheckEmailUser = createAsyncThunk(
  "user/actFetchCheckEmailUser",
  async (data) => {
    const dataStatus = await fetchCheckEmailUser(data);
    return dataStatus;
  }
);

export const actFetchOtp = createAsyncThunk(
  "user/actFetchOtp",
  async (email) => {
    console.log(email, " email bên redux");
    const otp = await fetchOtp(email);
    console.log(otp, "otp bên reduxs");
    return otp;
  }
);

export const actFetchLogin = createAsyncThunk(
  "users/actFetchLogin",
  async (user) => {
    const userData = await fetchLoginUser(user);
    return userData;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },

    actGetMe: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem(KEY_IS_LOGGER, JSON.stringify(true));
      state.isLogged = true;
    },
    actLogout: (state, action) => {
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      localStorage.removeItem(KEY_USER);
      localStorage.setItem(KEY_IS_LOGGER, JSON.stringify(false));
      state.isLogged = false;
      state.user = {};
      state.accessToken = "";
    },
  },

  extraReducers: (builder) => {
    // fetch all user
    builder.addCase(actFetchAllUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchAllUser.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUser = action.payload.data.data || [];
    });

    //fetch by id
    builder.addCase(actFetchUserById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchUserById.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userById = action.payload.data.data;
      state.user = action.payload.data.data;
    });

    //register

    //check mail
    builder.addCase(actFetchCheckEmailUser.pending, (state) => {
      state.isLoading = true;
      state.isOtp = false;
    });
    builder.addCase(actFetchCheckEmailUser.rejected, (state) => {
      state.errors = {
        errors: "Có lỗi xảy ra!",
      };
      state.isLoading = false;
      state.isOtp = false;
      toast.warning(state.errors);
    });

    builder.addCase(actFetchCheckEmailUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isOtp = action.payload;
    });

    //otp
    builder.addCase(actFetchOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.otp = action.payload.data;
    });

    // login

    builder.addCase(actFetchLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchLogin.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
      toast.error("Đăng nhập không thành công");
    });

    builder.addCase(actFetchLogin.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      const { accessToken } = action.payload.data;
      if (accessToken) {
        state.user = user;
        // localStorage.setItem(KEY_USER, JSON.stringify(state.user));
        state.accessToken = accessToken;
        localStorage.setItem(KEY_IS_LOGGER, JSON.parse(true));
        state.isLogged = true;
        localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
      }
      state.isLoading = false;
    });
  },
});

export const actReLogin = (accessToken) => async (dispatch) => {
  try {
    const decodeToken = Jwt.decode(accessToken);
    // console.log(decodeToken, "decodeToken");
    if (decodeToken?.sub) {
      const repsInfo = await fetchInforMe(decodeToken.sub);
      const infoUser = repsInfo?.data?.filter(
        (user) => user.email === decodeToken?.sub
      );
      // console.log(repsInfo, "repsInfo");
      // console.log(infoUser, "infoUser");
      // delete infoUser?.password
      dispatch(actGetMe(infoUser[0]));
      dispatch(loginSuccess());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actRegister = (data) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchRegisterUser(data);
  } catch (error) {
    console.log(error);
    toast.error("Đăng ký Thất bại");
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actCreateUser = (user) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreateUser(user);
    dispatch(actFetchAllUser());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actDeleteUser = (id) => async (dispatch) => {
  try {
    await fetchDeleteUser(id);
    dispatch(actFetchAllUser());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdateUser = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateUser(id, payload);
    await dispatch(actFetchAllUser());
    await dispatch(actFetchUserById(id));
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};
export const actUpdateProfile = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdateUser(id, payload);
    await dispatch(actFetchUserById(id));
    await dispatch(actFetchAllUser());
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdatePassword = (id, payload) => async (dispatch) => {
  try {
    await fetchUpdatePassword(id, payload);
    await dispatch(actFetchUserById(id));
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actResetPassword = (payload) => async (dispatch) => {
  try {
    await fetchResetPassword(payload);
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const actUpdateAddress = (id, address) => async (dispatch) => {
  try {
    await fetchUpdateAddress(id, address);
    dispatch(actUpdateLoadingCreate(true));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate, actGetMe, loginSuccess, actLogout } =
  userSlice.actions;
export default userSlice.reducer;
