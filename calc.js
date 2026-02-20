  function calcBalance() {
  //Revision 20260219 - Calculate the sediment continuity balance.  To Do:  Add more reference academic documentation.  Revise to allow multiple equation sources.
  //First, use the revised Equation (Gary Brown, 1/25/2026) to calc the sediment transport capacity ratio (qs2/qs1).
  //The Revised 2026 Sediment Transport Equation:  (Note: The d exponent and the n ratio and its exponent were revised in this version.)
  //S_2/S_1 = (q_s2/q_s1 )^(20/((7m) )) (q_1/q_2 )^(((20+6m))/((7m) )) (D_2/D_1 )^(20/21) (n_2/n_1 )^2
  //qs = sediment transport capacity; S = slope; q = flow; m = transport coefficient; d = size; n = manning's n value; t = sediment supply
  //Solve for qs2/qs1:
  //(q_s2/q_s1) = (((S_2/S_1 ))/((q_1/q_2 )^(((20+6m))/((7m) )) (D_2/D_1 )^(20/21) (n_2/n_1 )^2    ))^(((7m))/20)
  //(q_s2/q_s1) =   (s_part    / (q_bott   ^   q_exp           * d_bott   ^ d_exp * n_bott   ^n_exp))^  (e_part)
  //(q_s2/q_s1) =   (s_part    / (q_part                       * d_part           * n_part         ))^  (e_part)
  //q_exp = (20.0 + 6.0*m)/(7.0*m)
  //q_part = (q1/q2)**q_exp
  //d_part = (d2/d1)**(20.0/21.0)
  //n_part = (n2/n1)**(2.0)
  //s_part = s2/s1
  //qs_exp = 20.0/(7.0*m)
  //e_part = 1/qs_exp
  //qs2/qs1 = (s_part / (q_part * d_part * n_part)) ** e_part
  //qs2_qs1 = qs2/qs1
  //t2_t1 = t2/t1
  //The Sediment Continuity Balance is the Ratio of the Sediment Supply to the Sediment Transport Capacity.  Positive = Aggradation; Negative = Degradation.
  //Assume the sediment continuity balance is 0% at condition 1 (completely in balance).
  //Sediment Continuity Balance at Condition 2 = Ratio of the Sediment Supply (t2/t1) - Ratio of transport capacity (qs2/qs1).  
  //Sediment Continuity Balance (%) = (t2/t1 - qs2/qs1) * 100
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
  const q_exp = (20.0 + 6.0*m)/(7.0*m);
  const q_part = (q1/q2)**q_exp;
  const d_part = (d2/d1)**(20.0/21.0);
  const n_part = (n2/n1)**(2.0);
  const s_part = s2/s1;
  const qs_exp = 20.0/(7.0*m);
  const e_part = 1/qs_exp;
  const qs2_qs1 = (s_part / (q_part * d_part * n_part)) ** e_part;
  const t2_t1 = t2/t1;
  const balanceContinuityPercent = (t2_t1 - qs2_qs1)*100.0;
  const balanceContinuityPercentRounded = Math.round(balanceContinuityPercent);
  localStorage.setItem('calcBalancePercent', String(balanceContinuityPercentRounded));
  let angleCalc = balanceContinuityPercent * 0.4;
  localStorage.setItem('calcAngle',angleCalc);
  //Update the Lane's Balance Scale Chart with the current parameters and calculated Balance. 
  myBalanceScale.set_parameters(angleCalc,localStorage.getItem('calcBalancePercent'),s2*100.0,localStorage.getItem('valueFlow'),
  localStorage.getItem('valueManning'),localStorage.getItem('valueSupply'),d2*304.8)
  myBalanceScale.build_base();
  myBalanceScale.build_fulcrum();
  myBalanceScale.build_sed_meter();
  myBalanceScale.build_balance_bar();
  myBalanceScale.build_weights();
  myBalanceScale.build_scale_pointer();
  myBalanceScale.add_text_below_base();
  myBalanceScale.add_text_above_base();
}