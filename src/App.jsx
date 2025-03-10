import { useState } from "react";
import "./App.css";
import InputBox from "./components/inputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="flex w-1/2 justify-center item-center">
        <div className="flex flex-col item-center justify-center w-full mx-auto h-100 border border-green-200 rounded-lg p-5 backdrop-blur-sm bg-green/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="flex flex-row w-full  justify-between mb-4 gap-2">
              <div className="w-1/2 ">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>

              <div className="w-1/2">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <button
                type="button"
                className=" item-center h-12 rounded-3xl bg-amber-400 text-lg text-black px-2 py-0.5 mb-5 cursor-pointer hover:scale-125 transition-all ease-out "
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className=" w-2/3 bg-amber-400 text-slate-600 text-2xl px-4 py-3 rounded-lg bottom-0  hover:scale-125 transition-all ease-out"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
