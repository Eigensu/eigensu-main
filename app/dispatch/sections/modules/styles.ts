export const MODULES_STYLES = `
.bb-board{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px;margin-top:44px;}
.bb-tile{border-radius:20px;padding:22px;position:relative;overflow:hidden;min-height:230px;display:flex;flex-direction:column;justify-content:space-between;}
.bb-tile .mono{font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;}
.bb-tile-label{align-self:flex-start;}
.bb-tile-label b{display:block;font-family:var(--font-head);font-weight:700;font-size:1.05rem;letter-spacing:-.01em;margin-top:4px;}
.bb-tile-body{flex:1;display:flex;align-items:center;justify-content:center;padding:8px 0 20px;}
.bb-t-wine{background:var(--wine);color:var(--cream);}
.bb-t-wine .mono{color:var(--butter);}
.bb-t-ember{background:var(--ember);color:#fff;}
.bb-t-ember .mono{color:#4A0F00;}
.bb-t-butter{background:#F4E9D6;color:var(--wine);border:2px solid rgba(59,10,34,.14);}
.bb-t-butter .mono{color:var(--wine-2);}
.bb-t-basil{background:var(--basil);color:#EAF6EE;}
.bb-t-basil .mono{color:#9BE3B8;}
.bb-t-peri{background:#5C7CF0;color:#fff;}
.bb-t-peri .mono{color:#1B2A6B;}
.bb-t-paper{background:#fff;color:var(--wine);border:2px solid var(--wine);}
.bb-t-paper .mono{color:var(--ember);}
.bb-no-border{border:none;}
.bb-s3{grid-column:span 3;}
.bb-s4{grid-column:span 4;}
.bb-s5{grid-column:span 5;}
.bb-col-group{grid-column:1/-1;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px;align-items:stretch;}
.bb-col{display:flex;flex-direction:column;gap:14px;min-width:0;}
.bb-col > *:last-child{flex:1 1 auto;}

.bb-health{width:100%;display:flex;flex-direction:column;gap:16px;}
.bb-health-row{display:grid;grid-template-columns:60px minmax(0,1fr) 34px;gap:12px;align-items:center;}
.bb-health-label{font-size:.78rem;font-weight:600;color:var(--cream);}
.bb-health-track{height:20px;border-radius:100px;background:rgba(251,243,228,.12);overflow:hidden;}
.bb-health-fill{height:100%;border-radius:100px;display:block;}
.bb-health-pct{font-family:var(--font-mono);font-size:.72rem;color:rgba(251,243,228,.75);text-align:right;}

.bb-icons{display:flex;align-items:flex-end;gap:14px;}
.bb-icn{background:var(--wine);border-radius:26%;display:grid;place-items:center;}
.bb-icn.a{width:66px;height:66px;}
.bb-icn.b{width:44px;height:44px;}
.bb-icn.c{width:28px;height:28px;}

.bb-dash{width:100%;background:#fff;border-radius:12px;padding:14px;box-shadow:0 8px 20px rgba(59,10,34,.10);}
.bb-dash-row{display:flex;gap:8px;margin-bottom:12px;}
.bb-kpi{flex:1;background:var(--cream);border-radius:9px;padding:9px 10px;}
.bb-kpi u{display:block;text-decoration:none;font-family:var(--font-mono);font-size:8.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--wine-2);}
.bb-kpi b{font-family:var(--font-head);font-size:1.15rem;letter-spacing:-.02em;color:var(--wine);}
.bb-bars{display:flex;align-items:flex-end;gap:5px;height:64px;}
.bb-bars i{flex:1;background:var(--ember);border-radius:3px 3px 0 0;display:block;opacity:.9;}
.bb-bars i:nth-child(even){background:#5C7CF0;}

.bb-funnel{width:100%;max-width:440px;height:auto;margin:0 auto;}

.bb-lifecycle{width:100%;}
.bb-lc-title{font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--cream);opacity:.75;margin-bottom:16px;}
.bb-lc-step{display:flex;align-items:center;gap:11px;position:relative;padding:8px 0;}
.bb-lc-step:not(:last-child):before{content:"";position:absolute;left:4px;top:22px;bottom:-6px;width:1px;background:rgba(251,243,228,.32);}
.bb-lc-dot{width:9px;height:9px;border-radius:50%;background:var(--cream);flex:none;position:relative;z-index:1;}
.bb-lc-label{flex:1;font-size:.82rem;font-weight:600;color:var(--cream);font-family:var(--font-body);}
.bb-lc-time{font-family:var(--font-mono);font-size:.66rem;color:rgba(251,243,228,.72);}

.bb-chart{position:relative;width:100%;height:100%;min-height:220px;background:#EDEFF5;border-radius:12px;padding:16px 14px 30px 34px;overflow:hidden;}
.bb-chart-grid{position:absolute;left:34px;right:14px;top:16px;bottom:30px;display:flex;flex-direction:column;justify-content:space-between;background-image:linear-gradient(to bottom,rgba(27,42,107,.14) 1px,transparent 1px);background-size:100% 25%;background-position:top;}
.bb-chart-grid span{font-family:var(--font-mono);font-size:8px;color:#5A6B9E;transform:translate(-30px,-5px);}
.bb-chart-plot{position:absolute;left:34px;right:14px;top:16px;bottom:30px;display:flex;align-items:flex-end;justify-content:center;gap:16px;padding:0 20px;}
.bb-chart-bar{width:32%;max-width:52px;border-radius:3px 3px 0 0;}
.bb-chart-axis{position:absolute;left:34px;right:14px;bottom:8px;text-align:center;font-family:var(--font-mono);font-size:8px;color:#5A6B9E;}
.bb-chart-tip{position:absolute;top:14px;right:14px;background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 8px 20px rgba(27,42,107,.22);min-width:132px;}
.bb-chart-tip b{display:block;font-family:var(--font-head);font-size:.82rem;letter-spacing:-.01em;color:#1B2A6B;margin-bottom:8px;}
.bb-chart-tip div{font-size:.68rem;line-height:1.7;color:#3D5BD9;}
.bb-chart-tip div.sent{color:#9FB3F5;}

.bb-member{width:100%;background:var(--cream);border:2px solid var(--wine);border-radius:12px;padding:15px;}
.bb-member-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
.bb-member-head b{font-family:var(--font-head);font-size:1.05rem;letter-spacing:-.01em;display:block;}
.bb-member-head u{text-decoration:none;display:block;font-size:.68rem;color:var(--wine-2);margin-top:1px;}
.bb-badge{background:var(--butter);color:var(--wine);border-radius:100px;padding:4px 10px;font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;font-weight:700;}
.bb-tiers{display:flex;gap:3px;}
.bb-tiers i{flex:1;height:7px;border-radius:100px;background:#E0D3C2;display:block;}
.bb-tiers i.on{background:var(--butter);}
.bb-tiers-key{display:flex;justify-content:space-between;margin-top:7px;font-family:var(--font-mono);font-size:8px;letter-spacing:.04em;color:var(--wine-2);}

.bb-outlet{width:100%;background:#fff;border-radius:12px;overflow:hidden;}
.bb-outlet-head{display:flex;align-items:center;gap:8px;padding:9px 14px;border-bottom:1px solid #EFE7DA;}
.bb-outlet-head b{font-family:var(--font-head);font-size:.85rem;letter-spacing:-.01em;color:var(--wine);}
.bb-outlet-sel{display:flex;align-items:center;gap:10px;padding:8px 14px;background:#F3EFE8;}
.bb-outlet-sel div{flex:1;}
.bb-outlet-sel b{display:block;font-size:.78rem;color:var(--wine);}
.bb-outlet-sel u{display:block;text-decoration:none;font-size:.66rem;color:#8A7A83;margin-top:1px;}
.bb-outlet-chev{font-size:8px;color:#8A7A83;}
.bb-outlet-icon{width:15px;height:15px;flex:none;color:#3B0A22;}
.bb-outlet-list{display:flex;flex-direction:column;}
.bb-outlet-row{display:flex;align-items:center;gap:10px;padding:7px 14px;border-bottom:1px solid #F3EFE8;}
.bb-outlet-row:last-child{border-bottom:0;}
.bb-outlet-row div{flex:1;}
.bb-outlet-row b{display:block;font-size:.78rem;color:var(--wine);}
.bb-outlet-row u{display:block;text-decoration:none;font-size:.66rem;color:#8A7A83;margin-top:1px;}
.bb-outlet-check{font-size:.75rem;color:var(--basil);font-weight:700;}

.bb-admin{width:100%;display:flex;align-items:flex-start;gap:14px;background:#fff;border-radius:12px;padding:18px;}
.bb-admin-icon{width:42px;height:42px;flex:none;border-radius:11px;background:#EEF0F5;display:grid;place-items:center;}
.bb-admin-text b{display:block;font-family:var(--font-head);font-size:1.05rem;letter-spacing:-.015em;color:#14171F;margin-bottom:5px;}
.bb-admin-text p{margin:0;font-size:.78rem;line-height:1.5;color:#8A8D99;}

.bb-org{width:100%;background:#fff;border-radius:12px;padding:12px 14px 10px;margin-top:8px;}
.bb-org-head{font-family:var(--font-mono);font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#8A8D99;margin-bottom:6px;}
.bb-org-stats{display:flex;gap:18px;margin-bottom:8px;}
.bb-org-stats b{display:block;font-family:var(--font-head);font-size:1.05rem;letter-spacing:-.01em;color:#14171F;}
.bb-org-stats span{font-size:.68rem;color:#8A8D99;}
.bb-org-list{border:1px solid #F0F0EC;border-radius:10px;overflow:hidden;}
.bb-org-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 12px;border-bottom:1px solid #F0F0EC;}
.bb-org-row:last-child{border-bottom:0;}
.bb-org-row b{display:block;font-size:.78rem;color:#14171F;}
.bb-org-row u{display:block;text-decoration:none;font-size:.66rem;color:#8A8D99;margin-top:1px;}
.bb-org-role{display:flex;align-items:center;gap:8px;flex:none;}
.bb-org-role span{font-size:.7rem;color:#8A8D99;}
.bb-org-role i{width:7px;height:7px;border-radius:50%;background:#3FB27F;display:block;}
.bb-org-foot{display:flex;align-items:center;justify-content:space-between;margin-top:8px;}
.bb-org-add{font-size:.72rem;font-weight:600;color:#14171F;background:none;border:none;cursor:pointer;padding:0;}
.bb-org-manage{font-size:.72rem;font-weight:600;color:#8A8D99;text-decoration:none;}

@media(max-width:1050px){
  .bb-s3,.bb-s4,.bb-s5{grid-column:span 6;}
  .bb-col-group{grid-template-columns:repeat(6,minmax(0,1fr));}
}
@media(max-width:640px){
  .bb-board{grid-template-columns:1fr;}
  .bb-col-group{grid-template-columns:1fr;}
  .bb-s3,.bb-s4,.bb-s5{grid-column:1/-1;}
  .bb-tile{height:auto !important;min-height:230px;}
}
`;
