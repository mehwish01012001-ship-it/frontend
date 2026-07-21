import Home from '../pages/Home/Home';
import Shop from '../pages/Shop/Shop';
import ProductDetails from '../pages/ProductDetails/ProductDetails';

import Cart from '../pages/Cart/Cart';
import Wishlist from '../pages/Wishlist/Wishlist';
import Checkout from '../pages/Checkout/Checkout';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import TrackOrder from '../pages/TrackOrder/TrackOrder';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from '../pages/TermsConditions/TermsConditions';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Profile from '../pages/Profile/Profile';
import Orders from '../pages/Orders/Orders';
import CompareProducts from '../pages/CompareProducts/CompareProducts';
import Addresses from '../pages/Addresses/Addresses';

const routeConfig = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/product/:slug', component: ProductDetails },
  { path: '/productdetails/:slug', component: ProductDetails },

  { path: '/cart', component: Cart },
  { path: '/wishlist', component: Wishlist, private: true },
  { path: '/checkout', component: Checkout, private: true },
  { path: '/order-success/:orderId', component: OrderSuccess, private: true },
  { path: '/track-order', component: TrackOrder },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/faq', component: FAQ },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/terms-conditions', component: TermsConditions },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password/:token', component: ResetPassword },
  { path: '/profile', component: Profile, private: true },
  { path: '/orders', component: Orders, private: true },
  { path: '/compare-products', component: CompareProducts },
  { path: '/addresses', component: Addresses, private: true },
];

export default routeConfig;
