import React from "react";
import Banner from "../components/banner";

function PaymentInformation() {
  return (
    <div className="pages content">
      <Banner title="Payment & Returns" />
      <div className="ct">
        {/* <div className="hdr">Payment & Returns</div> */}
        <div className="small-hdr">REFUND POLICY</div>
        <div className="para">
          If you are unhappy with your product or if it has been damaged in
          transit, please contact us at contact@sootistudio.com as soon as
          possible with all possible image references. Sooti Studio endeavors to
          ensure that every transaction at our website is seamless. We take
          great care in delivering our products and adhere to the highest
          quality standards.
        </div>
        <div className="para">
          We do offer size exchange or product exchange within 72 hours of
          product delivery. In case, the size you ordered doesn’t fit you well,
          we offer free exchange with a different size
        </div>
        <div className="small-hdr">General</div>
        <div className="para">
          To return or exchange a product, please get in touch with our Customer
          Care within 48 hours of delivery:{" "}
        </div>
        <div className="para">
          by email at contact@sootistudio.com with your order number, date of
          transaction, delivery address, and image of the wrongfully delivered
          or defective item.
        </div>
        <div className="para">
          by WhatsApp at +91 7011507044 with your order number, date of
          transaction, delivery address, and image of the wrongfully delivered
          or defective item.
        </div>
        <div className="para">
          Check the products carefully once you receive them and mention any
          tampering of the package, missing item, or damage/ breakage on the
          delivery receipt presented by the courier partner.
        </div>
        <div className="para">
          Our customer care team will look into the issue and revert within 48
          working hours.
        </div>
        <div className="small-hdr">Exchange & Refund Policy</div>
        <div className="para">
          Given the nature of our products, we reserve the sole discretion to
          provide the resolution to any situation as we deem fit. Each return
          request is handled on a case by case basis and we request you to get
          in touch through WhatsApp on +91 7011507044 for prompt resolution.
        </div>
        <div className="para">
          In case, the size you ordered doesn’t fit you well, we offer free
          exchange with a different size, where we get the pickup done from your
          place and ship out the new size. Don’t worry; we take care of all the
          logistics.{" "}
        </div>
        <div className="para">
          The exchange/ return facility can be availed only once.
        </div>
        <div className="para">
          Customized products are not eligible for return or exchange.
        </div>
        <div className="para">
          No refunds would be given if the customer has provided a wrong or
          incomplete shipping address, there are 3 failed delivery attempts by
          our shipping agency, and/or the package is refused by the recipient.
        </div>
        <div className="para">
          In the case of International Orders if a customer refuses to pay the
          Duty as mandated by the respective country of shipment and doesn’t
          collect his/her order from the Shipping agency (like DHL, FedEx,
          etc.), then we will not be liable to refund any amount for such
          orders.
        </div>
        <div className="para">
          Before accepting delivery of any merchandise, please ensure that it is
          in good condition and has not been tampered with. In case you receive
          a package, which you believe was damaged in transit, please retain the
          original packaging (along with price tags, invoices, labels, etc.)
          until we send someone from our team to review it. Additionally, please
          mention details about the damaged merchandise on the delivery receipt
          instead of signing it as 'received'.
        </div>
        <div className="small-hdr">Disclaimer</div>
        <div className="para">
          Products purchased using a discount code are not eligible for a
          refund. They can only be exchanged at additional shipping costs of INR
          150. One can also opt for a credit voucher after adjusting shipping
          costs of INR 150.
        </div>
        <div className="para">
          Products on sale are not eligible for a refund. They can only be
          exchanged at additional shipping costs of INR 150. One can also opt
          for a credit voucher after adjusting shipping costs of INR 150.
        </div>
        <div className="para">
          International Orders are non-exchangeable and non-returnable.
        </div>
        <div className="small-hdr">Order Cancellation</div>
        <div className="para">
          If you wish to cancel your order, write to us within 24 hours of
          placing the order at contact@sootistudio.com or WhatsApp at +91
          7011507044 with your order number, date of transaction, and delivery
          address.
        </div>
      </div>
    </div>
  );
}

export default PaymentInformation;
