import React, { useEffect, useState } from "react";
import "./home.styles.css";
import { Carousel } from "antd";
import CategoryProduct from "../../components/CategoryProducts";
import { getAllCategories } from "../../api/productApi";
import { Link } from "react-router-dom";
function Home() {
  const [category, setCategory] = useState([]);
  const [loading] = useState(false);

  const allCategories = async () => {
    let res = await getAllCategories();
    setCategory(res.data);
  };
  useEffect(() => {
    allCategories();
  }, []);
  return (
    <div className="home">
      {/* <div className="home-title">Welcome To ShopSmart ! </div> */}
      <Carousel autoplay autoplaySpeed={4000} style={{ marginBottom: 30 }}>
        <Link to="/products/31">
          <div className="landing-images">
            <div className="landing-title">
              <div>Modern Elegance Teal ArmChair</div>
              <div style={{ fontSize: 15, fontWeight: 100 }}>Furniture</div>
            </div>
            <div className="landing-img">
              <img
                src="https://i.imgur.com/6wkyyIN.jpeg"
                alt="watch"
                height={100}
                width={100}
                className="landing-img2"
              />
            </div>
          </div>
        </Link>
        <Link to="/products/27">
          <div className="landing-images">
            <div className="landing-title">
              <div>Sleek SmartWatch with Vibrant Display</div>
              <div style={{ fontSize: 15, fontWeight: 100 }}>Electronics</div>
            </div>
            <div className="landing-img">
              <img
                src="https://i.imgur.com/LGk9Jn2.jpeg"
                alt="watch"
                height={100}
                width={100}
                className="landing-img2"
              />
            </div>
          </div>
        </Link>
        <Link to="/products/44">
          <div className="landing-images">
            <div className="landing-title">
              <div>Classic Blue Casual Shoes</div>
              <div style={{ fontSize: 15, fontWeight: 100 }}>Shoes</div>
            </div>
            <div className="landing-img">
              <img
                src="https://i.imgur.com/sC0ztOB.jpeg"
                alt="watch"
                height={100}
                width={100}
                className="landing-img2"
              />
            </div>
          </div>
        </Link>
        <Link to="/products/47">
          <div className="landing-images">
            <div className="landing-title">
              <div>Radiant Cirtus Perfume </div>
              <div style={{ fontSize: 15, fontWeight: 100 }}>Beauty</div>
            </div>
            <div className="landing-img">
              <img
                src="https://i.imgur.com/xPDwUb3.jpg"
                alt="watch"
                height={100}
                width={100}
                className="landing-img2"
              />
            </div>
          </div>
        </Link>
        {/* <div className="landing-images">
          <img
            src="https://i.imgur.com/LGk9Jn2.jpeg"
            alt="watch"
            className="landing-img"
          />
        </div>
        <div className="landing-images">
          <img
            src="https://i.imgur.com/sC0ztOB.jpeg"
            alt="watch"
            className="landing-img"
          />
        </div>
        <div className="landing-images">
          <img
            src="https://i.imgur.com/xPDwUb3.jpg"
            alt="watch"
            className="landing-img"
          />
        </div> */}
      </Carousel>
      <div>
        {loading ? (
          <></>
        ) : (
          <div>
            {category.map((cat) => {
              return (
                <div>
                  <CategoryProduct category={cat} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
