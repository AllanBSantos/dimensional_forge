import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  const [totalCost, setTotalCost] = useState('');
  const [platformCommission, setPlatformCommission] = useState('10');
  const [cashFlowReserve, setCashFlowReserve] = useState('');
  const [shippingCost, setShippingCost] = useState('6');
  const [saleTax, setSaleTax] = useState('4');
  const [netProfit, setNetProfit] = useState('');
  const [profitMargin, setProfitMargin] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const calculateValues = () => {
    const cost = parseFloat(totalCost) || 0;
    const commission = parseFloat(platformCommission) / 100 || 0;
    const reserve = parseFloat(cashFlowReserve) / 100 || 0;
    const shipping = parseFloat(shippingCost) / 100 || 0;
    const tax = parseFloat(saleTax) || 0;

    if (salePrice) {
      const sale = parseFloat(salePrice);
      const calculatedNetProfit = sale - cost - (sale * commission) - (sale * reserve) - (sale * shipping) - tax;
      const calculatedProfitMargin = (calculatedNetProfit / sale) * 100;

      setNetProfit(calculatedNetProfit.toFixed(2));
      setProfitMargin(calculatedProfitMargin.toFixed(2));
    } else if (profitMargin) {
      const margin = parseFloat(profitMargin) / 100;
      const calculatedSalePrice = (cost + tax) / (1 - commission - reserve - shipping - margin);
      const calculatedNetProfit = calculatedSalePrice * margin;

      setSalePrice(calculatedSalePrice.toFixed(2));
      setNetProfit(calculatedNetProfit.toFixed(2));
    }
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <form onSubmit={(e) => { e.preventDefault(); calculateValues(); }}>
        <div className='ColumForm'>

        
      <div className='RowForm'>
      <label>
          Custo Total (R$)
          <input
            type="number"
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
          />
        </label>
        <label>
          Comissão Plataforma (%)
          <input
            type="number"
            value={platformCommission}
            onChange={(e) => setPlatformCommission(e.target.value)}
          />
        </label>
        <label>
          Reserva Fluxo de Caixa (%)
          <input
            type="number"
            value={cashFlowReserve}
            onChange={(e) => setCashFlowReserve(e.target.value)}
          />
        </label>
        <label>
          Custo Frete (%)
          <input
            type="number"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
          />
        </label>
      </div>
      <div className='RowForm'>
      <label>
          Taxa de venda (R$)
          <input
            type="number"
            value={saleTax}
            onChange={(e) => setSaleTax(e.target.value)}
          />
        </label>
        <label>
          Lucro Líquido (R$)
          <input
            type="number"
            value={netProfit}
            readOnly
          />
        </label>
        <label>
          Margem de Lucro (%)
          <input
            type="number"
            value={profitMargin}
            onChange={(e) => setProfitMargin(e.target.value)}
          />
        </label>
        <label>
          Valor de Venda (R$)
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </label>

      </div>
      <button type="submit">Calcular</button>

      </div>

        
       
      </form>
    </div>
  );
}

export default App;
