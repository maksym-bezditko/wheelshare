import "./index.css";
import Header from "../../components/Header";
import camaro from '../../assets/camaro.png'

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="description-wrapper">
          <div className="text-and-buttons">
            <p className="description-title"><span>Wheelshare</span> - A car for you whenever you need it</p>
            <p className="description-subtitle">With us, you can forget about spending on
maintenance and fuel - we'll cover it for you.
Do you want to feel the freedom of choice? We have a wide selection
cars - from the economy class to the premium segment.
Whatever you choose, you can count on
perfect condition of the car, complete
security and high level of service.</p>

            <div className="description-button-group">
              <div className="description-button go-button">Go</div>
              <div className="description-button choose-button">Choose your car</div>
            </div>
          </div>
          <div className="camaro-wrapper">
            <img src={camaro} alt="camaro" />
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;