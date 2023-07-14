import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { TransferProvider } from "../Context/TransferContext";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <TransferProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </TransferProvider>
  </div>
);

export default MyApp;
