import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Carousel from "./Carousel";
import Menu from "./Menu";
import Footer from "./Footer";
import "../dist/css/home.css";
import Scroll from "./Scroll";
const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);
  return (
    <div className="bg-home">
      <Menu />
      <div className="">
        <Carousel />
      </div>
      <Scroll showBelow={250} />
      <div className="container mt-3">
        <img
          style={{ cursor: "pointer", marginBottom: "20px" }}
          src="https://cdn.tgdd.vn/2020/12/banner/1200-75-1200x75-2.png"
          alt="đt"
          width="1200"
          height="75"
        ></img>
        <Search />
        <div className="row mb-4">
          <div className="col-3">
            <img
              width="590"
              height="300"
              src="https://xgear.vn/wp-content/uploads/2020/02/Asus-store.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/02/Asus-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-568x289.jpg 568w"
              data-lazy-sizes="(max-width: 590px) 100vw, 590px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/02/Asus-store.jpg"
              sizes="(max-width: 590px) 100vw, 590px"
              srcset="https://xgear.vn/wp-content/uploads/2020/02/Asus-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/Asus-store-568x289.jpg 568w"
              data-was-processed="true"
            />
          </div>
          <div className="col-3">
            <img
              width="590"
              height="300"
              src="https://xgear.vn/wp-content/uploads/2020/02/MSI-store.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/02/MSI-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-568x289.jpg 568w"
              data-lazy-sizes="(max-width: 590px) 100vw, 590px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/02/MSI-store.jpg"
              sizes="(max-width: 590px) 100vw, 590px"
              srcset="https://xgear.vn/wp-content/uploads/2020/02/MSI-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/MSI-store-568x289.jpg 568w"
              data-was-processed="true"
            />
          </div>
          <div className="col-3">
            <img
              width="590"
              height="300"
              src="https://xgear.vn/wp-content/uploads/2020/02/ACER-store.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/02/ACER-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-568x289.jpg 568w"
              data-lazy-sizes="(max-width: 590px) 100vw, 590px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/02/ACER-store.jpg"
              sizes="(max-width: 590px) 100vw, 590px"
              srcset="https://xgear.vn/wp-content/uploads/2020/02/ACER-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/ACER-store-568x289.jpg 568w"
              data-was-processed="true"
            />
          </div>
          <div className="col-3">
            <img
              width="590"
              height="300"
              src="https://xgear.vn/wp-content/uploads/2020/02/PC-store.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/02/PC-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-568x289.jpg 568w"
              data-lazy-sizes="(max-width: 590px) 100vw, 590px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/02/PC-store.jpg"
              sizes="(max-width: 590px) 100vw, 590px"
              srcset="https://xgear.vn/wp-content/uploads/2020/02/PC-store.jpg 590w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-300x153.jpg 300w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-193x98.jpg 193w, https://xgear.vn/wp-content/uploads/2020/02/PC-store-568x289.jpg 568w"
              data-was-processed="true"
            />
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
          <h3 className="">Best Sellest</h3>
          <i
            style={{ fontSize: "1.75rem", fontWeight: "600" }}
            className="far fa-angle-double-right"
          ></i>
        </div>

        <div className="row">
          {productBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
        <div
          className="row mb-3 "
          // style={{ borderTop: "3px solid black", paddingTop: "20px" }}
        >
          <div className="col-4">
            <img
              width="563"
              height="323"
              src="https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button.jpg 563w, https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button-300x172.jpg 300w, https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button-193x111.jpg 193w"
              data-lazy-sizes="(max-width: 563px) 100vw, 563px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button.jpg"
              sizes="(max-width: 563px) 100vw, 563px"
              srcset="https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button.jpg 563w, https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button-300x172.jpg 300w, https://xgear.vn/wp-content/uploads/2020/03/Laptop-Gaming-Button-193x111.jpg 193w"
              data-was-processed="true"
            />
          </div>
          <div className="col-4">
            <img
              width="885"
              height="522"
              src="https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed.jpg 885w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-300x177.jpg 300w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-768x453.jpg 768w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-193x114.jpg 193w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-568x335.jpg 568w"
              data-lazy-sizes="(max-width: 885px) 100vw, 885px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed.jpg"
              sizes="(max-width: 885px) 100vw, 885px"
              srcset="https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed.jpg 885w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-300x177.jpg 300w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-768x453.jpg 768w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-193x114.jpg 193w, https://xgear.vn/wp-content/uploads/2020/10/monitor_slider_compressed-568x335.jpg 568w"
              data-was-processed="true"
            />
          </div>
          <div className="col-4">
            <img
              width="855"
              height="522"
              src="https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed.jpg"
              class="vc_single_image-img attachment-full lazyloaded"
              alt=""
              data-lazy-srcset="https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed.jpg 855w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-300x183.jpg 300w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-768x469.jpg 768w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-193x118.jpg 193w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-568x347.jpg 568w"
              data-lazy-sizes="(max-width: 855px) 100vw, 855px"
              data-lazy-src="https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed.jpg"
              sizes="(max-width: 855px) 100vw, 855px"
              srcset="https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed.jpg 855w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-300x183.jpg 300w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-768x469.jpg 768w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-193x118.jpg 193w, https://xgear.vn/wp-content/uploads/2020/10/Freebuild-PC_T10_Slider_compressed-568x347.jpg 568w"
              data-was-processed="true"
            />
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
          <h3 className="">New Arrivals </h3>
          <i
            style={{ fontSize: "1.75rem", fontWeight: "600" }}
            className="far fa-angle-double-right"
          ></i>
        </div>
        <div className="row">
          {productByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>

        <div className="row container" style={{ marginBottom: "20px" }}>
          <div
            className="col-6 h-content"
            style={{
              color: "whitesmoke",
              fontWeight: "400",
              border: "4px solid black",
              background: "black",
              padding: "10px",
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3 className="center"> Payment Methods</h3>
          </div>
          <div className="col-1">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/visa.svg"
              width="54"
              alt=""
            />
          </div>
          <div className="col-1">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/mastercard.svg"
              width="54"
              alt=""
            />
          </div>
          <div className="col-1">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/jcb.svg"
              width="54"
              alt=""
            />
          </div>
          <div className="col-1">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/cash.svg"
              width="54"
              alt=""
            />
          </div>
          <div className="col-1 center">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/internet-banking.svg"
              width="54"
              alt=""
            />
          </div>
          <div className="col-1">
            <img
              class="icon"
              src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/installment.svg"
              width="54"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
