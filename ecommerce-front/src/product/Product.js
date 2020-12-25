import React, { useEffect, useState } from "react";
import Layout from "./../core/Layout";
import { getProducts, read, listRelated } from "./../core/apiCore";
import Card from "../core/Card";
import { API } from "./../config";
import "../dist/css/productDetail.css";
import "../dist/css/reset.css";
import { Link } from "react-router-dom";
import { addItem } from "./../cart/cartHelpers";
import Footer from "../core/Footer";
import Scroll from "../core/Scroll";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <div>
      <Layout
        title={product.name}
        description="New"
        // product && product.description && product.description.substring(0, 100)

        className="container"
      >
        {/* <div className="head">
        <h2 className="mb-4">
          Product <i class="fas fa-angle-double-right"></i>
        </h2>
      </div> */}
        <Scroll showBelow={250} />
        <div className="row mt-3">
          <div className="col-4 col-pic">
            <div class="img-hover" style={{ width: "400x", height: "500px" }}>
              <div
                className="hover-pic"
                style={{ width: "450x", height: "400px" }}
              >
                <img
                  src={`${API}/product/photo/${product._id}`}
                  alt="image product"
                ></img>
              </div>
              <div className="rate">
                <span>Rating:</span>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              {product.quantity > 0 && (
                <Link>
                  <div className="bt-card">
                    <button onClick={addToCart} className="add-cart">
                      <i class="fas fa-cart-plus"></i>
                    </button>
                  </div>
                </Link>
              )}
              {product.quantity < 0 && (
                <div className="bt-card">
                  <button
                    className="btn btn-danger"
                    style={{ padding: "10px 40px" }}
                  >
                    Out Of Stock <i class="fas fa-exclamation-circle"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-4 item">
            <h4>
              Name:{" "}
              <span className="" style={{ fontWeight: "500" }}>
                {product.name}
              </span>
            </h4>
            <h4>
              Price:{" "}
              <span className="red">
                {product.price} <i class="fas fa-dollar-sign"></i>
              </span>
            </h4>
            <h4>
              Description:{" "}
              <span
                className="text-muted"
                style={{ fontWeight: "350", fontSize: "18px" }}
              >
                {product.description}
              </span>
            </h4>
            <div className="break"></div>
            <div className="grift">
              <h4 style={{ fontWeight: "700" }}>Khuyến mãi và quà tặng:</h4>
              <ul>
                <li>
                  <i class="fas fa-heart"></i> Dán bảo vệ sản phẩm trong 1 năm.
                </li>
                <li>
                  <i class="fas fa-heart"></i> Miễn phí vệ sinh sản phẩm trong 1
                  năm.
                </li>
                <li>
                  <i class="fas fa-heart"></i> Giảm 10% khi mua sản phẩm khác.
                </li>
                <li className="bt-bottom">
                  <i class="fas fa-heart"></i> Tặng 1 tai nghe AirPods Pro
                </li>
              </ul>
            </div>
            <div className="gop">
              <h4 style={{ fontWeight: "700" }}>Ưu đãi trả góp: </h4>
              <div className="pic">
                <img src="https://xgear.vn/wp-content/uploads/2019/12/hdf-logo-768x171.png"></img>
                <img src="https://xgear.vn/wp-content/uploads/2019/12/logo-mpos.png"></img>
              </div>
              <ul>
                <li>
                  <i class="fas fa-heart"></i> Trả trước chỉ từ 10% giá trị máy.
                </li>
                <li>
                  <i class="fas fa-heart"></i> Lãi suất thấp nhất thi trường.
                </li>
                <li>
                  <i class="fas fa-heart"></i> Kì hạn 9-24 tháng.
                </li>
                <li className="bt-bottom">
                  <a>Đăng kí ngay để nhận tư vấn từ chuyên viên.</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-4 final-col">
            <div className="chilren">
              <div className="col-logo">
                <a href="">
                  <img src="https://xgear.vn/wp-content/uploads/2019/12/Button-ROG-Store-2.jpg"></img>
                </a>
              </div>
              <h5>Bảo hành và dịch vụ:</h5>
              <div class="guarantee">
                <ul>
                  <li>
                    <i class="fas fa-check"></i> Bảo hành chính hãng 24 tháng
                    tại các TTBH Asus trên toàn quốc.{" "}
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Miễn phí vệ sinh laptop trong
                    thời gian bảo hành.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Giảm giá 10% khi mua Gaming
                    Gear.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Đổi mới lên đến 14 ngày nếu bị
                    lỗi từ nhà sản xuất.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Miễn phí quẹt thẻ ATM, Visa,
                    Master.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Trả góp 0% bằng thẻ tín dụng
                    qua M-Pos. Chi tiết.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Chính sách đảm bảo hài lòng.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Linh kiện nâng cấp bảo hành
                    theo tiêu chuẩn nhà sản xuất.
                  </li>
                  <li>
                    <i class="fas fa-check"></i> Hỗ trợ cài đặt hệ điều hành và
                    phần mềm.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row rw-2">
          <div className="col-4 item-pic">
            <div className="logo-foo">
              <img src="https://xgear.vn/wp-content/uploads/2019/02/support-64x64.png"></img>
            </div>
            <h5>HỖ TRỢ 24/7</h5>
          </div>
          <div className="col-4 item-pic ">
            <div className="logo-foo">
              <img src="https://xgear.vn/wp-content/uploads/2019/02/delivery-truck-64x64.png"></img>
            </div>
            <h5>MIỄN PHÍ VẬN CHUYỂN</h5>
          </div>
          <div className="col-4 item-pic ">
            <div className="logo-foo">
              <img src="https://xgear.vn/wp-content/uploads/2019/02/return-64x64.png"></img>
            </div>
            <h5>30 NGÀY ĐỔI MỚI</h5>
          </div>
        </div>
        <div className="row reg-row">
          <div className="col regis">
            <Link to="/signup">
              <button>
                REGRISTER NOW <i class="fas fa-user"></i>
              </button>
            </Link>
          </div>
        </div>
        <div
          className="h-content"
          style={{
            color: "whitesmoke",
            fontWeight: "400",
            border: "4px solid red",
            background: "red",
            padding: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 className="">Related Products </h3>
          <i
            style={{ fontSize: "1.75rem", fontWeight: "600" }}
            className="far fa-angle-double-right"
          ></i>
        </div>
        <div className="row">
          {relatedProduct.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default Product;
