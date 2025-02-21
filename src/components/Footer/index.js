import React from "react";
import "./footer.styles.css";
function Footer() {
  return (
    <div className="footer">
      <div>This is an e-commerce web app created by Ayush</div>
      <div>
        ShopSmart is your go-to destination for the latest gadgets, fashion, and
        more. We are committed to providing high-quality products at the best
        prices. Need help? Contact us at support@shopsmart.com or follow us on
        social media for the latest updates. Happy shopping!
      </div>
      <p>&copy; {new Date().getFullYear()} ShopSmart. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
