import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/home/Hero";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { CravoraShowcase } from "@/components/home/CravoraShowcase";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Metrics } from "@/components/home/Metrics";
import { CareersPreview } from "@/components/home/CareersPreview";
import { Partners } from "@/components/home/Partners";
import { LatestNewsPopup } from "@/components/home/LatestNewsPopup";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BiovaCo Nexus | Innovation Holding Company | Food, Agriculture & Technology Ventures India</title>
        <meta name="description" content="BiovaCo Nexus is India's leading innovation holding company building next-generation consumer brands in food (Cravora), agricultural technology, and AI. Founded by Nakul Mundhada & Richa Rajan. CIN: U46300ME2026PTC475352." />
        <meta name="keywords" content="BiovaCo Nexus, Innovation Holding Company India, Cravora, Indian Food Brand, FMCG Startup, Nakul Mundhada, Richa Rajan, Agriculture Technology India, AI India, Consumer Brands India, Venture Building, Brand Incubator, Food Innovation, Nagpur Startup, Maharashtra Company, Make in India, Flavoured Makhana, Snack Brand India, Food Science, Flavour Engineering, Om Agro, Indian Startup 2026, D2C Food Brand, BiovaCo Nexus Private Limited, CIN U46300ME2026PTC475352" />
        <link rel="canonical" href="https://biovaco.in" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biovaco.in/" />
        <meta property="og:title" content="BiovaCo Nexus | Innovation Holding Company | India" />
        <meta property="og:description" content="We build, launch and scale the next generation of consumer brands, agricultural innovation and technology ventures. Home of Cravora." />
        <meta property="og:image" content="https://biovaco.in/Logo.png" />
        <meta property="og:site_name" content="BiovaCo Nexus" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BiovaCo Nexus | Innovation Holding Company" />
        <meta name="twitter:description" content="Building next-generation consumer brands in food, agriculture & technology from India." />
        <meta name="twitter:image" content="https://biovaco.in/Logo.png" />
      </Helmet>
      <Hero />
      <WhoWeAre />
      <CravoraShowcase />
      <Ecosystem />
      <Metrics />
      <CareersPreview />
      <Partners />
      <LatestNewsPopup />
    </>
  );
}
