import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Comment from '../../components/Comment/Comment'
import CommentInput from '../../components/CommentInput/CommentInput'
import useScrollToTop from '../../hooks/useScrollToTop'
import { actFetchBookById, actFetchBookByIdCategory } from '../../redux/features/bookSlice/bookSlice'
import { actCreateCart } from '../../redux/features/cartSlice/cartSlice'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductDetailPage.scss'
import { actFetchDataEvaluateByIdBook } from '../../redux/features/evaluateSlice/evaluateSlice'
import Loading from '../../components/Loading/Loading'
import { IMG_URL } from '../../constants/config'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
const ProductDetailPage = () => {
    const settingsVendor = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              with: 800,
            }
          },
          {
            breakpoint: 1415,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              with:  800,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };
    useScrollToTop()
    const param = useParams()
    const {book} = useSelector((state) => state.book)
    const {bookByCategory} = useSelector((state) => state.book)
    const [cardState, setCardState] = useState(book)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const {evaluate} = useSelector((state) => state.evaluate)
    const {user} = useSelector((state) => state.user)

    const {isLoading} = useSelector((state) => state.book)

    const [isLoaded, setIsLoaded] = useState(false);

    const priceAfterDiscount = book.price - (book.price * (book.discount/100)) 

    let formattedPrice = book?.price?.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    let formattedpriceAfterDiscount = priceAfterDiscount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    useEffect(() => {
        setIsLoaded(!isLoading);
    }, [isLoading]);


    const initialState = {
        userId: user?.id,
        bookId: book?.id,
        amount: 1,
    }
  
    const [cartState, setCartState] = useState(initialState)

    useEffect(() => {
        setCardState(book)
    },[book])

    useEffect(() => {
        dispatch(actFetchDataEvaluateByIdBook(book.id))
    },[book])



    useEffect(() => {
        setCartState(initialState)
    },[book, user])

    useEffect(() => {
        dispatch(actFetchBookById(Number(param.idProduct)))
    },[param])


    useEffect(() => {
        if(book?.categoryId > 0) {
            dispatch(actFetchBookByIdCategory(book?.categoryId))
        }
    },[book?.categoryId])

    const handleDecrease = () => {
        setQuantity(prev => {
            if (prev < 2) {
                toast.warning("Số sản phẩm phải lớn hơn 0")
            }else {
                setCartState(prevState => ({
                    ...prevState,
                    amount: prevState.amount - 1
                }))
                return prev - 1
            }
            return prev
        })
        
    }

    const handleIncrease = () => {
        setQuantity(prev => {
            return prev + 1
        })
        setCartState(prevState => ({
            ...prevState,
            amount: prevState.amount + 1
        }))
    }

    const handleWatchShop = (id) => {
        navigate(`/vendor/${id}`)
    }

    const handleAddToCard = () => {
        if(!user.id) {
            toast.warning("Vui lòng đăng nhập !!")
        }else if(book?.quantity < 1){
            toast.warning("Sản phẩm đã hết hàng")
        }else{
            dispatch(actCreateCart(cartState))
        }
    }

    
  return (
    <>
    {
        isLoaded ? (
            <div className='product-detail'>
            <div className='product-detail-content'>
                <div className='left'>
                {cardState.images && cardState.images.length > 0 && (
                        <img src={`${IMG_URL}${book?.images[0]}`} alt="Product" />
                )}
                {
                    book?.quantity < 1 && 
                        (<div className='overlay-card'>
                            <span>Hết hàng</span>
                        </div>)
                }
                </div>
    
                <div className="right">
                    <div className="top">
                        <h1 className='name-product'>{cardState?.name}</h1>
                        <div className='author-product'>
                            <p><span>Tác giả: </span>{cardState?.author}</p>
                            <div className='rating'>
                                <div className='star'>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <span className='quantity'>10</span>
                            </div>
                        </div>
                    </div>
                    <div className='mid'>
                        {
                            (book?.discount > 0) && <span className='discount'>Giảm {book.discount}%</span>
                        }
                        <div className='price'>
                            {
                                (book?.discount > 0) && <span className='adv-price'>{formattedPrice}</span>
                            }
                            <span className='later-price'>{formattedpriceAfterDiscount}</span>
                        </div>
                        <div className='desc'>
                            <p>Thể Loại: <span>{book?.category}</span></p>
                            <p>Nhà xuất bản: <span>{book?.publishing}</span></p>
                            <p>Số lượng: <span>{book?.quantity}</span></p>
                            <p className='tags-container'>
                                {
                                    book?.tags?.map(tag => {
                                        return(
                                            <span className='tag' key={tag?.id}>{tag?.name}</span>
                                        )
                                    })
                                }
                            </p>
                        </div>
                    </div>
                    <div className='bot'>
                        <div className='quantity'>
                            <span>Số lượng</span>
                            <div className="quantity-input">
                                <button className='decrease' onClick={handleDecrease}>-</button>
                                <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                                <button className='increase' onClick={handleIncrease}>+</button>
                            </div>
                        </div>
                        <button className='add-cart' onClick={handleAddToCard}> <i className="fa-solid fa-bag-shopping"></i> Thêm vào giỏ hàng</button>
                        <button className='add-wishlist'>Yêu thích</button>
                    </div>
                </div>
            </div>
            <div className='product-detail-shop'>
                <div className='shop-detail'>
                    <img src={`${IMG_URL}${book?.store?.avatar}`} alt="" className='avatar'/>
                    <div className='info'>
                        <div className="name">{book?.store?.name}</div>
                        <button className='see-shop' onClick={() => handleWatchShop(book?.store?.id)}>Ghé thăm</button>
                    </div>
                </div>
                <div className='achievements'>
                    <div className='text'>
                        <span>Đánh Giá</span>
                        <span>616</span>
                    </div>
                    <div className='text'>
                        <span>Sản Phẩm</span>
                        <span>616</span>
                    </div>
                    <div className='text'>
                        <span>Người Theo Dõi</span>
                        <span>616</span>
                    </div>
                </div>  
            </div>
            <div className='product-detail-desc'>
                <h2 className='heading'>Mô tả sản phẩm</h2>
                <div className='desc-container' dangerouslySetInnerHTML={{__html: cardState?.description}}>
    
                </div>
            </div>
    
            <div className="product-detail-review">
                <h2 className='heading'>Đánh giá</h2>
                <div className='review-container'>
                    {/* <CommentInput/> */}
                    {
                        evaluate.map((data, index) => {
                            return(
                                <div key={index}>
                                    <Comment data={data}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    
            <div className='product-detail-related'>
                <div className="heading">
                    <h2>Sản phẩm liên quan</h2>
                </div>
                <div className='related'>
                    {
                        <Slider {...settingsVendor}>
                        {
                            bookByCategory?.filter(book => book.status === 0).map(data => {
                            return(
                                <div key={data?.id}>
                                    <Card data={data}/>
                                </div>
                            )
                            })
                        }
                        </Slider>
                    }
                </div>
            </div>
        </div>
        ): (
            <Loading/>
        )
    }
    </>
  )
}

export default ProductDetailPage