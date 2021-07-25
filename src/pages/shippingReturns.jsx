import React from "react";
import "./css/pages.css";
import Banner from "../components/banner";

function ShippingReturns() {
  return (
    <div className="pages content">
      <Banner title="Shipping" />
      <div className="ct">
        {/* <div className="hdr">SHIPPING POLICY</div> */}

        <div className="small-hdr">Shipping</div>
        <div className="para">
          We are now delivering worldwide again. In case, we are unable to
          deliver to you because of government restrictions, we will notify you
          via email. It usually takes about 7 business days to ship out the
          order and up to 7 business days to deliver from the date of shipping.
          As soon you place your order, you will receive a confirmation e-mail
          and another update once a product is shipped out.{" "}
        </div>
        <div className="small-hdr">Logistic Terms & Condition</div>
        <div className="para">
          We offer free shipping on all products across India when paid online,
          for COD we levy a nominal fee of Rs 80/-. The delivery may take up to
          3-7 business days from the date of dispatch, depending upon the
          location in India. International Deliveries We ship worldwide. You can
          place the order in any of the currency selections is available on the
          website. It may take between 10 to 15 business days to deliver your
          order depending upon the location of the consignment. We charge a flat
          INR 2000 for international shipping. You get the shipping free on
          orders above USD 300 (or equivalent). International orders are
          non-exchangeable and non-returnable.
        </div>
        <div className="small-hdr">International Deliveries</div>
        <div className="para">
          We ship worldwide. You can place the order in any of the currency
          selections is available on the website. It may take between 10 to 15
          business days to deliver your order depending upon the location of the
          consignment.{" "}
        </div>
        <div className="para">
          We charge a flat INR 2000 for international shipping. You get the
          shipping free on orders above USD 300 (or equivalent).
        </div>
        <div className="para">
          International orders are non-exchangeable and non-returnable.
        </div>
        <div className="small-hdr">Order tracking</div>
        <div className="para">
          Orders that have been processed and shipped can be tracked using the
          consignment/tracking number on the shipping agency’s website. Once
          your order is shipped, we will mail you your tracking number along
          with information about the shipping agency.
        </div>
      </div>
    </div>
  );
}

export default ShippingReturns;
