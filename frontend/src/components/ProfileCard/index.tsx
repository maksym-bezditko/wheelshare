import "./index.css";
import avatar from "./assets/avatar.png";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/slice";
import { useCallback, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import format from "date-fns/format";

const ProfileCard = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const [isCvvRequested, setIsCvvRequested] = useState(false);
  const [isCvvShown, setIsCvvShown] = useState(false);

  const revealCvv = useCallback(async () => {
    setIsCvvRequested(true);
    setTimeout(() => {
      setIsCvvShown(true);
      setIsCvvRequested(false);
    }, 1000);
  }, []);

  const renderCvvBlock = useCallback(() => {
    if (isCvvRequested) {
      return (
        <div
          style={{
            width: 40,
            height: 25,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#676767',
          }}
        >
          <ThreeDots
            height="15"
            width="20"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      );
    } else if (isCvvShown) {
      return <p>{currentUser?.cvv}</p>;
    } else {
      return <div className="cvv-placeholder" onClick={revealCvv} style={{ width: 40, height: 25, borderRadius: 10 }}></div>;
    }
  }, [currentUser?.cvv, isCvvRequested, isCvvShown, revealCvv]);

  return (
    <div className="profile-card-wrapper">
      <h3 className="black-text profile-title">Your profile</h3>
      <div className="profile-description-wrapper">
        <img className="avatar-image" src={avatar} alt="avatar" />
        <div className="profile-description-info">
          <div className="fields-wrapper column">
            <p>Your firstname: </p>
            <p>Your lastname: </p>
            <p>Your date of birth: </p>
            <p>Your email: </p>
          </div>
          <div className="values-wrapper column">
            <p>{currentUser?.firstName}</p>
            <p>{currentUser?.lastName}</p>
            <p>{format(new Date(currentUser?.dateOfBirth || 0), 'd MMMM yyyy')}</p>
            <p>{currentUser?.email}</p>
          </div>
        </div>
      </div>
      <h3 className="black-text profile-title withLittleMarginTop">
        Your payment cards
      </h3>
      <div className="bank-card white-text">
        <div className="bank-card-info-wrapper">
          <div className="card-fields-wrapper column">
            <p>Bank: </p>
            <p>Card number: </p>
            <p>Card term: </p>
            <p>CVV: </p>
          </div>
          <div className="card-values-wrapper column">
            <p>{currentUser?.bank}</p>
            <p>{currentUser?.cardNumber}</p>
            <p>{currentUser?.cardTerm}</p>

            {renderCvvBlock()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
