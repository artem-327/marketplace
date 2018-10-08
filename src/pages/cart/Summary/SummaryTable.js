import React from 'react';
import "./SummaryTable.css"

const SummaryTable = () => {
  return (
    <div className="summary-table">
      <header>
        <h1>Summary</h1>
        <i class="fas fa-info-circle"></i>
      </header>
      <main>
        <table>
          <tbody>
            <tr><td>Subtotal</td><td>$111</td></tr>
            <tr><td>Estimated Shipping</td><td>$111</td></tr>
            <tr><td>Estimated Tax</td><td>$111</td></tr>
            <tr><td><b>Total</b></td><td>$111</td></tr>
          </tbody>
        </table>
      </main>
      <footer>
        <button>Continue</button>
      </footer>
    </div>
  );
};

export default SummaryTable;