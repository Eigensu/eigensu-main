"use client";

function TileLabel({ mono, title }: { mono: string; title: string }) {
  return (
    <div className="bb-tile-label">
      <span className="mono">{mono}</span>
      <b>{title}</b>
    </div>
  );
}

const LEAF_PATH = "M50 22c3 16 19 19 19 36a19 19 0 1 1-38 0c0-10 6-15 9-22 2 6 7 7 8 3 2-4-1-10 2-17z";
const OUTLET_ICON_PATH = "M4 10l1-5h14l1 5M4 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0M5 10v9h14v-9";

function OutletIcon() {
  return (
    <svg className="bb-outlet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={OUTLET_ICON_PATH} />
    </svg>
  );
}

export function GuestIntelligenceTile() {
  const rows = [
    { label: "Healthy", pct: 62, color: "#0F4D2E" },
    { label: "Watch", pct: 24, color: "#5C7CF0" },
    { label: "At Risk", pct: 9, color: "#F0491F" },
    { label: "Dormant", pct: 5, color: "#FFC53D" },
  ];
  return (
    <div className="bb-tile bb-t-wine bb-s4" style={{ height: 280, alignSelf: "start" }}>
      <div className="bb-tile-body">
        <div className="bb-health">
          {rows.map((r) => (
            <div key={r.label} className="bb-health-row">
              <span className="bb-health-label">{r.label}</span>
              <div className="bb-health-track">
                <div className="bb-health-fill" style={{ width: `${r.pct}%`, background: r.color }} />
              </div>
              <span className="bb-health-pct">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <TileLabel mono="01 — GUEST INTELLIGENCE" title="Know every guest." />
    </div>
  );
}

export function SmartSegmentationTile() {
  return (
    <div className="bb-tile bb-t-butter bb-s3" style={{ height: 280, alignSelf: "start" }}>
      <div className="bb-tile-body">
        <div className="bb-icons">
          <span className="bb-icn a"><svg width="30" height="30" viewBox="0 0 100 100"><path d={LEAF_PATH} fill="#F0491F" /></svg></span>
          <span className="bb-icn b"><svg width="20" height="20" viewBox="0 0 100 100"><path d={LEAF_PATH} fill="#FFC53D" /></svg></span>
          <span className="bb-icn c"><svg width="13" height="13" viewBox="0 0 100 100"><path d={LEAF_PATH} fill="#FFC53D" /></svg></span>
        </div>
      </div>
      <TileLabel mono="02 — SMART SEGMENTATION" title="Create your own segments." />
    </div>
  );
}

export function CampaignEngineTile() {
  const bars = [38, 62, 47, 80, 55, 92, 44, 68];
  return (
    <div className="bb-tile bb-t-paper bb-no-border bb-s5" style={{ height: 280, alignSelf: "start" }}>
      <div className="bb-tile-body">
        <div className="bb-dash">
          <div className="bb-dash-row">
            <div className="bb-kpi"><u>Sent</u><b>4,180</b></div>
            <div className="bb-kpi"><u>Delivered</u><b>97%</b></div>
            <div className="bb-kpi"><u>Read</u><b>71%</b></div>
          </div>
          <div className="bb-bars">
            {bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
          </div>
        </div>
      </div>
      <TileLabel mono="03 — CAMPAIGN ENGINE" title="Reach the right audience." />
    </div>
  );
}

export function ReservationsTile() {
  return (
    <div className="bb-tile bb-t-basil bb-s5" style={{ height: 600 }}>
      <div className="bb-tile-body">
        <svg className="bb-funnel" viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg">
          <polygon points="20,20 360,20 340,90 40,90" fill="#7FBF9E" />
          <polygon points="40,90 340,90 275,160 105,160" fill="#4B8F63" />
          <polygon points="105,160 275,160 235,230 145,230" fill="#2C6B44" />
          <polygon points="145,230 235,230 190,300" fill="#0F4D2E" />
          <line x1="40" y1="90" x2="340" y2="90" stroke="#fff" strokeWidth="2" />
          <line x1="105" y1="160" x2="275" y2="160" stroke="#fff" strokeWidth="2" />
          <line x1="145" y1="230" x2="235" y2="230" stroke="#fff" strokeWidth="2" />
          <g fontFamily="Instrument Sans, sans-serif" fontWeight={700} fontSize={17} fill="#fff" textAnchor="middle">
            <text x="190" y="61">121,206</text>
            <text x="190" y="131">102,695</text>
            <text x="190" y="201">36,434</text>
            <text x="190" y="262">17,320</text>
          </g>
        </svg>
      </div>
      <TileLabel mono="04 — RESERVATIONS & BOOKINGS" title="Connect every visit." />
    </div>
  );
}

export function FinanceTile() {
  return (
    <div className="bb-tile bb-t-paper bb-s5" style={{ height: 220 }}>
      <div className="bb-tile-body">
        <div className="bb-member">
          <div className="bb-member-head">
            <div>
              <b>Priya Nair</b>
              <u>Gold member · 14 visits · last seen 63 days ago</u>
            </div>
            <span className="bb-badge">At risk</span>
          </div>
          <div className="bb-tiers"><i className="on" /><i className="on" /><i /><i /></div>
          <div className="bb-tiers-key"><span>Active</span><span>At risk</span><span>Dormant</span><span>Lost</span></div>
        </div>
      </div>
      <TileLabel mono="07 — FINANCE & BILLING" title="Know where the money goes." />
    </div>
  );
}

export function InboxTile() {
  const steps = [
    { label: "Queued", time: "20:11:58" },
    { label: "Sent", time: "20:12:01" },
    { label: "Delivered", time: "20:12:03" },
    { label: "Read", time: "20:12:44" },
  ];
  return (
    <div className="bb-tile bb-t-ember bb-s3" style={{ minHeight: 150, height: 300 }}>
      <div className="bb-tile-body">
        <div className="bb-lifecycle">
          <div className="bb-lc-title">Message lifecycle</div>
          {steps.map((s) => (
            <div key={s.label} className="bb-lc-step">
              <span className="bb-lc-dot" />
              <span className="bb-lc-label">{s.label}</span>
              <span className="bb-lc-time">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
      <TileLabel mono="05 — INBOX & CONVERSATIONS" title="Never lose a reply." />
    </div>
  );
}

export function MultiRestaurantTile() {
  const outlets = [
    { name: "Fielia", area: "Mahalaxmi", active: true },
    { name: "Gigi", area: "Bandra" },
    { name: "Scarlett House", area: "Juhu" },
    { name: "Soraia", area: "Mahalaxmi" },
    { name: "Sweeney", area: "Khar" },
  ];
  return (
    <div className="bb-tile bb-t-wine bb-s3" style={{ minHeight: 150, height: 350 }}>
      <div className="bb-tile-body">
        <div className="bb-outlet">
          <div className="bb-outlet-head">
            <svg width="18" height="18" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#FFC53D" strokeWidth="4" />
              <path d={LEAF_PATH} fill="#F0491F" />
            </svg>
            <b>DishPatch</b>
          </div>
          <div className="bb-outlet-sel">
            <OutletIcon />
            <div><b>Fielia</b><u>Mahalaxmi</u></div>
            <span className="bb-outlet-chev">▲</span>
          </div>
          <div className="bb-outlet-list">
            {outlets.map((o) => (
              <div key={o.name} className={`bb-outlet-row ${o.active ? "active" : ""}`}>
                <OutletIcon />
                <div><b>{o.name}</b><u>{o.area}</u></div>
                {o.active && <span className="bb-outlet-check">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TileLabel mono="08 — MULTI-RESTAURANT" title="One account. Every outlet." />
    </div>
  );
}

export function AnalyticsChartTile() {
  return (
    <div className="bb-tile bb-t-peri bb-s4" style={{ minHeight: 150, height: 350 }}>
      <div className="bb-tile-body">
        <div className="bb-chart">
          <div className="bb-chart-grid">
            <span>6000</span><span>4500</span><span>3000</span><span>1500</span><span>0</span>
          </div>
          <div className="bb-chart-plot">
            <div className="bb-chart-bar" style={{ height: "68.3%", background: "#CBD8FC" }} />
            <div className="bb-chart-bar" style={{ height: "28.2%", background: "#3D5BD9" }} />
            <div className="bb-chart-bar" style={{ height: "12.2%", background: "#1B2A6B" }} />
          </div>
          <div className="bb-chart-axis">W28 2026</div>
          <div className="bb-chart-tip">
            <b>W28 2026</b>
            <div>Delivered : 1692</div>
            <div>Read/Opened : 734</div>
            <div className="sent">Sent : 4098</div>
          </div>
        </div>
      </div>
      <TileLabel mono="06 — ANALYTICS & REPORTS" title="See what is happening." />
    </div>
  );
}

export function AdminTile() {
  const admins = [
    { name: "Suramya Sri", scope: "Fielia · Soraia", role: "Admin" },
    { name: "Japtej", scope: "5 restaurants", role: "Admin" },
    { name: "Eigensu", scope: "6 restaurants", role: "Super Admin" },
  ];
  return (
    <div className="bb-tile bb-t-butter bb-s4" style={{ minHeight: 150, height: 500 }}>
      <div className="bb-tile-body" style={{ flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start", padding: 0 }}>
        <div className="bb-admin">
          <div className="bb-admin-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F4D2E" strokeWidth="1.6">
              <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
            </svg>
          </div>
          <div className="bb-admin-text">
            <b>Admin Management</b>
            <p>Create admin users. Super admins only.</p>
          </div>
        </div>
        <div className="bb-org">
          <div className="bb-org-head">ORGANISATION</div>
          <div className="bb-org-stats">
            <div><b>6</b><span>restaurants</span></div>
            <div><b>12</b><span>admins</span></div>
          </div>
          <div className="bb-org-list">
            {admins.map((a) => (
              <div key={a.name} className="bb-org-row">
                <div><b>{a.name}</b><u>{a.scope}</u></div>
                <div className="bb-org-role"><span>{a.role}</span><i /></div>
              </div>
            ))}
          </div>
          <div className="bb-org-foot">
            <button type="button" className="bb-org-add">+ Create admin</button>
            <a href="#" className="bb-org-manage">Manage access →</a>
          </div>
        </div>
      </div>
      <TileLabel mono="09 — ADMIN & GOVERNANCE" title="Stay in control." />
    </div>
  );
}
