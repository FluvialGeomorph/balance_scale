function calcBalance(stableOption) {
  //Calculate the sediment transport capacity ratio (qs2/qs1) with the Gary Brown (2025) equation (for conditions 1 & 2)
  //S2/S1 ~ (qs2/qs1)^(20/7m) * (q1/q2)^((20+6m)/7m) * (D2/D1)^(40/21) * (n1/n2)^(78/21)
  //qs = sediment transport capacity; S = slope; q = flow; m = transport coefficient; d = size; n = manning's n value; t = sediment supply
  //Solve for qs2/qs1:
  //qs2/qs1 = ((S2/S1) / ((q1/q2)^((20+6m)/7m) * (D2/D1)^(40/21) * (n1/n2)^(78/21)))^(7m/20)
  //qs2/qs1 = ( s_part / ( q_part              *  d_part          * n_part        ))^(e_part)
  //q_exp = (20.0 + 6.0*m)/(7.0*m)
  //q_part = (q1/q2)**q_exp
  //d_part = (d2/d1)**(40.0/21.0)
  //n_part = (n1/n2)**(78.0/21.0)
  //s_part = s2/s1
  //qs_exp = 20.0/(7.0*m)
  //e_part = 1/qs_exp
  //qs2/qs1 = (s_part / (q_part * d_part * n_part)) ** e_part
  //qs2_qs1 = qs2/qs1
  //t2_t1 = t2/t1
  //Sediment Continuity Balance = Ratio of the Sediment Supply to the Sediment Transport Capacity.  Positive = Aggradation; Negative = Degradation.
  //Assume the sediment continuity balance is 0% at condition 1 (completely in balance).
  //Sediment Continuity Balance at Condition 2 = Ratio of the Sediment Supply (t2/t1) - Ratio of transport capacity (qs2/qs1).  
  //Sediment Continuity Balance % = (t2/t1 - qs2/qs1) * 100
  const s2 = Number(localStorage.getItem('valueSlope')) / 100.0;
  const s1 = Number(localStorage.getItem('defaultSlope')) / 100.0;
  const q2 = Number(localStorage.getItem('valueFlow'));
  const q1 = Number(localStorage.getItem('defaultFlow'));
  const m = Number(localStorage.getItem('defaultTransport'));
  const d2 = Number(localStorage.getItem('valueSize')) / 304.8;
  const d1 = Number(localStorage.getItem('defaultSize')) / 304.8;
  const n2 = Number(localStorage.getItem('valueManning'));
  const n1 = Number(localStorage.getItem('defaultManning'));
  const t2 = Number(localStorage.getItem('valueSupply')) / 3600.0;
  const t1 = Number(localStorage.getItem('defaultSupply')) / 3600.0;
  const q_exp = (20.0 + 6.0*m)/(7.0*m)
  const q_part = (q1/q2)**q_exp
  const d_part = (d2/d1)**(40.0/21.0)
  const n_part = (n1/n2)**(78.0/21.0)
  const s_part = s2/s1
  const qs_exp = 20.0/(7.0*m)
  const e_part = 1/qs_exp
  const qs2_qs1 = (s_part / (q_part * d_part * n_part)) ** e_part
  const t2_t1 = t2/t1
  const balanceContinuityPercent = (t2_t1 - qs2_qs1)*100.0
  const balanceContinuityPercentRounded = Math.round(balanceContinuityPercent)
  localStorage.setItem('calcBalancePercent', String(balanceContinuityPercentRounded));
  let angleCalc = balanceContinuityPercent * 0.4;
  localStorage.setItem('calcAngle',angleCalc);
  updateLanesBalanceScaleChart();
}