import React, { useEffect, useState } from 'react'
import BestSeller from '../../components/BestSeller/BestSeller'
import CategoryList from '../../components/CategoryList/CategoryList'
import StandBanner from '../../components/StandBanner/StandBanner'
import TopProduct from '../../components/TopProduct/TopProduct'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss'
import { slideData } from '../../constants/slideData'
import Card from '../../components/Card/Card'
import { cardData } from '../../constants/cartData'
import LieBanner from '../../components/LieBanner/LieBanner'
import CardVendor from '../../components/CardVendor/CardVendor'
import { vendorData } from '../../constants/vendorData'
import useScrollToTop from '../../hooks/useScrollToTop'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actFetchAllBook, actFetchBookBestSelling } from '../../redux/features/bookSlice/bookSlice'
import { actFetchAllStore } from '../../redux/features/storeSlice/storeSlice'
import Loading from '../../components/Loading/Loading'
const HomePage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  useScrollToTop()

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
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
          dots: true
        }
      },
      {
        breakpoint: 1415,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
          slidesToScroll: 1
        }
      }
    ]
  };
  const settingsVendor = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 6,
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
          dots: true
        }
      },
      {
        breakpoint: 1415,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
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
          slidesToScroll: 1
        }
      }
    ]
  };
  const dispatch = useDispatch()
  const {allBook} = useSelector((state) => state.book)
  const {allStore} = useSelector((state) => state.store)
  const [searchTerm, setSearchTerm] = useState([])
  const {isLoading} = useSelector((state) => state.book)

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setIsLoaded(!isLoading);
  }, [isLoading]);




  useEffect(() => {
    dispatch(actFetchAllStore())
  },[])

  useEffect(() => {
    dispatch(actFetchAllBook())
  },[])

  const handleViewAll = () => {
    navigate("/product")
  }
  const handleViewAllVendor = () => {
    navigate("/vendor")
  }

  const handleSearch = (searchTerm) => {
    navigate(`/product/search?payload=${searchTerm}`);
  }

  return  (
    <>
      {
        isLoaded ? (
          <div className='homepage'>
          <div className='homepage-heading'>
              <div className='category'>
                  <div className='category-text'>
                    <i className="fa-solid fa-braille"></i>
                    <span>Categories</span>
                  </div>
                  <span className='icon'><i className="fa-solid fa-angle-up"></i></span>
              </div>
              <div className="search">
                  <div className='search-input'>
                    <input type="text" placeholder='Search product...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button onClick={() => handleSearch(searchTerm)}><i className="fa-solid fa-magnifying-glass"></i></button>
                  </div>
              </div>
              <div className="map">
                <i className="fa-solid fa-location-dot"></i>
                <span>Find a Book Store</span>
              </div>
          </div>
          <div className="homepage-container">
            <div className='homepage__left'>
                <div className='homepage__left--category'>
                    <CategoryList/>
                </div>
                <div className='homepage__left--top'>
                  <TopProduct/>
                </div>
                <div className="homepage__left--best">
                  <BestSeller/>
                </div>
                <div className='banner-stand'>
                  <StandBanner/>
                </div>
            </div>
    
            <div className="homepage__right">
                <div className='homepage__right--slide'>
                    {
                      <Slider {...settings}>
                          {
                            slideData?.map(data => {
                              return(
                                <div key={data.id}>
                                    <img src={data.img} alt="" />
                                </div>
                              )
                            })
                          }
                      </Slider>
                    }
                </div>
                <div className="homepage__right--product">
                    <div className="heading">
                        <p className='title'>Popular Books</p>
                        <button className='view' onClick={handleViewAll}>View All</button>
                    </div>
                    <div className='product-container'>
                      {
                        allBook?.data?.filter(book => book.status === 0).slice(0,6).map(data => {
                          return (
                            <div key={data?.id}>
                              <Card data={data}/>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
                
                <div className='lie-banner'>
                      <LieBanner/>
                </div>
    
                <div className="homepage__right--product">
                    <div className="heading">
                        <p className='title'>On sale</p>
                        <button className='view' onClick={handleViewAll}>View All</button>
                    </div>
                    <div className='product-container'>
                      {
                        allBook?.data?.filter(book => book.status === 0).filter(card => card.discount > 0).slice(0,6).map(data => {
                          return (
                            <div key={data?.id}>
                              <Card data={data}/>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
          </div> 
          <div className='homepage-vendor'>
                <div className="homepage-vendor--vendor">
                    <div className="heading">
                        <p className='title'>Top selling vendor</p>
                        <button className='view' onClick={handleViewAllVendor}>View All</button>
                    </div>
                    <div className='product-vendor'>
                        {
                          <Slider {...settingsVendor}>
                            {
                              allStore?.map(data => {
                                return(
                                  <div key={data?.id}>
                                      <CardVendor data={data}/>
                                  </div>
                                )
                              })
                            }
                          </Slider>
                        }
                    </div>
                </div>
          </div>
      </div>
        ) : (
          <Loading/>
        )
      }
    </>

  )
}

export default HomePage