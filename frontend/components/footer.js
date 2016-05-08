import React from 'react';
import { ApFooter, ApFooterStyle } from 'apeman-react-footer';

const Footer = () => {
  return (
    <div className="footer">
      <ApFooterStyle />
      <ApFooter>
        © Shogi(仮) by <a href="https://github.com/mgi166">@mgi166</a>
      </ApFooter>
    </div>
  );
};

export default Footer;
