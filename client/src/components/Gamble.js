import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import game from "../asset//maingame.jpg";

const Gamble = () => {
  const [playerMoney, setPlayerMoney] = useState(100);
  const [haveMoney, setHaveMoney] = useState("");

  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/signin" />;
  }

  const oneDollar = () => {
    if (playerMoney < 1) {
      return setHaveMoney("Not enough money");
    } else if (Math.random() > 0.5) {
      return setPlayerMoney(playerMoney + 1);
    } else if (Math.random() < 0.5) {
      return setPlayerMoney(playerMoney - 1);
    }
  };

  const threeDollar = () => {
    if (playerMoney < 3) {
      return setHaveMoney("Not enough money");
    } else if (Math.random() > 0.5) {
      return setPlayerMoney(playerMoney + 3);
    } else if (Math.random() < 0.5) {
      return setPlayerMoney(playerMoney - 3);
    }
  };

  const fiveDollar = () => {
    if (playerMoney < 5) {
      return setHaveMoney("Not enough money");
    } else if (Math.random() > 0.5) {
      return setPlayerMoney(playerMoney + 5);
    } else if (Math.random() < 0.5) {
      return setPlayerMoney(playerMoney - 5);
    }
  };

  const tenDollar = () => {
    if (playerMoney < 10) {
      return setHaveMoney("Not enough money");
    } else if (Math.random() > 0.5) {
      return setPlayerMoney(playerMoney + 10);
    } else if (Math.random() < 0.5) {
      return setPlayerMoney(playerMoney - 10);
    }
  };

  return (
    <div className="gamble">
      <Link to="/gamelib" className="gamble__back">
        Back to Game Library
      </Link>
      <div className="gamble__title">The Main Game</div>
      <img className="gamble__img" src={game} alt="game" />

      <div className="gamble__playmoney">You have ${playerMoney}</div>
      <div>{haveMoney}</div>
      <div className="gamble__bets">
        <button className="gamble__bets--bet" onClick={oneDollar}>
          $1
        </button>
        <button className="gamble__bets--bet" onClick={threeDollar}>
          $3
        </button>
        <button className="gamble__bets--bet" onClick={fiveDollar}>
          $5
        </button>
        <button className="gamble__bets--bet" onClick={tenDollar}>
          $10
        </button>
      </div>
    </div>
  );
};

export default Gamble;
