import Image from "../assets/opp1.png"
import MobileView from "../assets/opp2.png"
const opps = Array.from({length: 8}).map((_, i) => ({
  id: i+1,
  title: 'Auto Repair and Service Opportunity',
  location: 'Lagos, Nigeria',
  category: 'Bakery', 
  price: 'NGN 400 M',
  badge: i%3 === 0 ? 'For Sale' : i%3===1 ? 'Required Loan' : 'Investment',
  image: Image, 
  mobileImage: MobileView, 
  mobileprice: 'NGN 400,000',
}));

export default opps;
