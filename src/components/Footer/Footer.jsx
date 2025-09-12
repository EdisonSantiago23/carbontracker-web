import React from "react";
import styles from "../../assets/jss/material-dashboard-react/components/footerStyle.jsx";

export default function Footer() {
  const currentYear = 1900 + new Date().getYear();

  return (
    <footer
      style={{
        ...styles.footer,
      }}
    >
      <div style={{ ...styles.container }}>
        <p style={{ ...styles.right }}>
          <span>
            &copy; {currentYear}{" "}
            <a
              href="https://www.creative-tim.com?ref=mdr-footer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.a }}
            >
              Tecno Global
            </a>
            , soluciones
          </span>
        </p>
      </div>
    </footer>
  );
}
