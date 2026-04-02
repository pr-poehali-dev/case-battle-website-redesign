/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";

const BATTLE_IMAGE = "https://cdn.poehali.dev/projects/732fcb4d-1794-4d68-bb9c-436696d2303a/files/478ef263-cfe5-4842-837f-a40e8905e488.jpg";

const CASES = [
  { id: 1, name: "NEON STRIKE", price: 150, img: "⚡", rarity: "rare", players: 234, bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.3)", color: "#00d4ff" },
  { id: 2, name: "GOLD RUSH", price: 500, img: "🏆", rarity: "legendary", players: 89, bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)", color: "#ffd700" },
  { id: 3, name: "SHADOW OPS", price: 250, img: "🔮", rarity: "epic", players: 156, bg: "rgba(191,90,242,0.1)", border: "rgba(191,90,242,0.3)", color: "#bf5af2" },
  { id: 4, name: "CYBER KNIFE", price: 750, img: "🗡️", rarity: "legendary", players: 45, bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)", color: "#ffd700" },
  { id: 5, name: "ARCTIC", price: 100, img: "❄️", rarity: "common", players: 412, bg: "rgba(158,168,179,0.1)", border: "rgba(158,168,179,0.3)", color: "#9ea8b3" },
  { id: 6, name: "INFERNO", price: 300, img: "🔥", rarity: "epic", players: 178, bg: "rgba(255,107,53,0.1)", border: "rgba(255,107,53,0.3)", color: "#ff6b35" },
];

const BATTLES = [
  { id: 1, player1: "SHADOW_X", player2: "DARK_WOLF", bet: 500, round: "3/5", p1Score: 2, p2Score: 1, status: "live" },
  { id: 2, player1: "NEON_PRO", player2: "???", bet: 250, round: "0/3", p1Score: 0, p2Score: 0, status: "waiting" },
  { id: 3, player1: "ACE_KING", player2: "CYBER_X", bet: 1000, round: "5/5", p1Score: 3, p2Score: 2, status: "finished" },
  { id: 4, player1: "STORM99", player2: "???", bet: 150, round: "0/3", p1Score: 0, p2Score: 0, status: "waiting" },
];

const WIN_FEED = [
  { user: "SHADOW_X", item: "★ Butterfly Knife | Fade", amount: 4500, rarity: "legendary" },
  { user: "NEON_PRO", item: "AK-47 | Neon Revolution", amount: 1200, rarity: "epic" },
  { user: "ACE_KING", item: "M4A4 | Howl", amount: 8000, rarity: "legendary" },
  { user: "ZERO_7", item: "USP Cortex", amount: 350, rarity: "rare" },
  { user: "STRIKER", item: "★ Karambit | Doppler", amount: 6700, rarity: "legendary" },
  { user: "CYBER_X", item: "Desert Eagle | Blaze", amount: 900, rarity: "epic" },
  { user: "DARK_WOLF", item: "AWP | Dragon Lore", amount: 15000, rarity: "legendary" },
];

const TOP_PLAYERS = [
  { rank: 1, name: "DARK_WOLF", wins: 847, winrate: 68, profit: 124500, avatar: "🐺" },
  { rank: 2, name: "SHADOW_X", wins: 723, winrate: 64, profit: 98200, avatar: "👤" },
  { rank: 3, name: "NEON_PRO", wins: 651, winrate: 61, profit: 87400, avatar: "⚡" },
  { rank: 4, name: "ACE_KING", wins: 589, winrate: 59, profit: 74100, avatar: "🃏" },
  { rank: 5, name: "CYBER_X", wins: 512, winrate: 57, profit: 62800, avatar: "🤖" },
  { rank: 6, name: "STORM99", wins: 478, winrate: 55, profit: 54300, avatar: "⛈️" },
  { rank: 7, name: "STRIKER", wins: 445, winrate: 54, profit: 48900, avatar: "🎯" },
  { rank: 8, name: "ZERO_7", wins: 401, winrate: 52, profit: 41200, avatar: "🔫" },
];

const SHOP_ITEMS = [
  { id: 1, name: "★ Butterfly Knife | Fade", price: 4500, rarity: "legendary", emoji: "🦋" },
  { id: 2, name: "AWP | Dragon Lore", price: 12000, rarity: "legendary", emoji: "🐉" },
  { id: 3, name: "★ Karambit | Doppler", price: 6700, rarity: "legendary", emoji: "🔪" },
  { id: 4, name: "AK-47 | Fire Serpent", price: 3200, rarity: "epic", emoji: "🐍" },
  { id: 5, name: "M4A4 | Howl", price: 8000, rarity: "legendary", emoji: "🐺" },
  { id: 6, name: "Glock | Fade", price: 900, rarity: "epic", emoji: "💥" },
];

const ROULETTE_ITEMS = ["⚡", "🔥", "💎", "🏆", "🗡️", "🔮", "❄️", "🌟", "💀", "🎯"];

type Page = "home" | "cases" | "profile" | "stats" | "rating" | "shop" | "support";

const getRarityStyle = (rarity: string) => {
  switch (rarity) {
    case "legendary": return { color: "#ffd700", bg: "rgba(255,215,0,0.15)", border: "rgba(255,215,0,0.4)" };
    case "epic": return { color: "#bf5af2", bg: "rgba(191,90,242,0.15)", border: "rgba(191,90,242,0.4)" };
    case "rare": return { color: "#00d4ff", bg: "rgba(0,212,255,0.15)", border: "rgba(0,212,255,0.4)" };
    default: return { color: "#9ea8b3", bg: "rgba(158,168,179,0.1)", border: "rgba(158,168,179,0.3)" };
  }
};

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [balance, setBalance] = useState(1250);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winItem, setWinItem] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [battleFilter, setBattleFilter] = useState<"all" | "live" | "waiting">("all");
  const [spinPos, setSpinPos] = useState(0);
  const animRef = useRef<number | null>(null);

  const tickerItems = [...WIN_FEED, ...WIN_FEED];

  const spinRoulette = (caseItem: typeof CASES[0]) => {
    if (isSpinning || balance < caseItem.price) return;
    setBalance(b => b - caseItem.price);
    setWinItem(null);
    setIsSpinning(true);

    const totalItems = ROULETTE_ITEMS.length;
    const itemWidth = 136;
    const targetIndex = Math.floor(Math.random() * totalItems);
    const spins = 5;
    const finalOffset = -(spins * totalItems * itemWidth + targetIndex * itemWidth - 400);
    const duration = 3500;
    const startPos = spinPos;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startPos + (finalOffset - startPos) * eased;
      setSpinPos(current);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinItem(ROULETTE_ITEMS[targetIndex]);
      }
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)", fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <header style={{ background: "rgba(13,20,33,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--card-border)", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("home")}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00ff87, #00d4ff)", boxShadow: "0 0 20px rgba(0,255,135,0.4)" }}>
              <span className="text-lg">⚡</span>
            </div>
            <span className="font-russo text-xl tracking-widest" style={{ background: "linear-gradient(135deg, #00ff87, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              NEON BATTLE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {([
              { id: "home", label: "ГЛАВНАЯ" },
              { id: "cases", label: "КЕЙСЫ" },
              { id: "rating", label: "РЕЙТИНГ" },
              { id: "shop", label: "МАГАЗИН" },
              { id: "support", label: "ПОДДЕРЖКА" },
            ] as { id: Page; label: string }[]).map(item => (
              <button key={item.id} className={`nav-btn ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <span style={{ color: "var(--neon-gold)", fontSize: "14px", fontWeight: 700 }}>₽</span>
              <span className="font-bold text-white text-sm">{balance.toLocaleString()}</span>
              <button className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--neon-green)", color: "#070b14" }}>+</button>
            </div>
            <button className="w-9 h-9 rounded-full overflow-hidden cursor-pointer" style={{ background: "linear-gradient(135deg, #bf5af2, #00d4ff)", border: "2px solid rgba(0,255,135,0.4)" }} onClick={() => setPage("profile")}>
              <span className="flex items-center justify-center h-full text-sm">👤</span>
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
          {([
            { id: "home", label: "Главная" },
            { id: "cases", label: "Кейсы" },
            { id: "rating", label: "Рейтинг" },
            { id: "shop", label: "Магазин" },
            { id: "support", label: "Помощь" },
          ] as { id: Page; label: string }[]).map(item => (
            <button key={item.id} className={`nav-btn text-xs whitespace-nowrap ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Win ticker */}
      <div className="ticker-wrap py-2">
        <div className="flex gap-8 animate-ticker" style={{ width: "max-content" }}>
          {tickerItems.map((item, i) => {
            const s = getRarityStyle(item.rarity);
            return (
              <div key={i} className="flex items-center gap-2 px-3">
                <span className="text-xs font-bold" style={{ color: "#3d4f6b" }}>{item.user}</span>
                <span className="text-xs font-semibold" style={{ color: s.color }}>{item.item}</span>
                <span className="text-xs font-bold" style={{ color: "var(--neon-gold)" }}>+₽{item.amount.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === "home" && (
          <HomePage setPage={setPage} battles={BATTLES} battleFilter={battleFilter} setBattleFilter={setBattleFilter} cases={CASES} />
        )}
        {page === "cases" && (
          <CasesPage cases={CASES} balance={balance} selectedCase={selectedCase} setSelectedCase={setSelectedCase} spinRoulette={spinRoulette} isSpinning={isSpinning} spinPos={spinPos} winItem={winItem} setWinItem={setWinItem} />
        )}
        {page === "profile" && <ProfilePage balance={balance} />}
        {page === "rating" && <RatingPage players={TOP_PLAYERS} />}
        {page === "shop" && <ShopPage items={SHOP_ITEMS} balance={balance} setBalance={setBalance} />}
        {page === "support" && <SupportPage />}
      </main>

      <footer style={{ borderTop: "1px solid var(--card-border)", marginTop: "60px", padding: "32px 16px", textAlign: "center" }}>
        <p className="font-russo text-xl mb-2" style={{ background: "linear-gradient(135deg, #00ff87, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEON BATTLE</p>
        <p style={{ color: "#3d4f6b", fontSize: "12px" }}>© 2024 NEON BATTLE. Только для лиц 18+. Играйте ответственно.</p>
      </footer>
    </div>
  );
}

// ========== HOME ==========
function HomePage({ setPage, battles, battleFilter, setBattleFilter, cases }: any) {
  return (
    <div>
      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden mb-10" style={{ minHeight: 420 }}>
        <img src={BATTLE_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(7,11,20,0.97) 0%, rgba(0,255,135,0.04) 50%, rgba(7,11,20,0.93) 100%)" }} />
        <div className="grid-bg absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full py-20 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(0,255,135,0.08)", border: "1px solid rgba(0,255,135,0.2)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse-neon inline-block" style={{ background: "var(--neon-green)" }} />
            <span style={{ color: "var(--neon-green)", fontSize: "13px", fontWeight: 700, letterSpacing: "2px" }}>LIVE • 1,847 ИГРОКОВ ОНЛАЙН</span>
          </div>
          <h1 className="font-russo mb-4" style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 1.1, letterSpacing: "2px" }}>
            <span style={{ color: "white" }}>ОТКРЫВАЙ КЕЙСЫ.</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #00ff87, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ПОБЕЖДАЙ В БАТЛАХ.</span>
          </h1>
          <p className="mb-8" style={{ color: "#4a5568", fontSize: "16px", maxWidth: 500 }}>
            Сражайся с другими игроками в реальном времени и выигрывай редкие предметы
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-neon-green font-russo text-base" onClick={() => setPage("cases")}>ОТКРЫТЬ КЕЙС</button>
            <button className="btn-outline font-russo text-base">СОЗДАТЬ БАТЛ</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Игроков онлайн", value: "1,847", icon: "Users", color: "var(--neon-green)" },
          { label: "Батлов сегодня", value: "3,241", icon: "Zap", color: "var(--neon-blue)" },
          { label: "Выплачено", value: "₽4.2M", icon: "TrendingUp", color: "var(--neon-gold)" },
          { label: "Активных батлов", value: "127", icon: "Swords", color: "var(--neon-purple)" },
        ].map((stat, i) => (
          <div key={i} className="game-card p-4 text-center shine-effect">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
              <Icon name={stat.icon as any} size={20} style={{ color: stat.color }} />
            </div>
            <div className="font-russo text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div style={{ color: "#4a5568", fontSize: "12px", fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Battles */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-green)", boxShadow: "0 0 10px var(--neon-green)" }} />
            <h2 className="font-russo text-xl text-white">БАТЛЫ</h2>
            <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold" style={{ background: "rgba(255,59,59,0.12)", color: "#ff3b3b", border: "1px solid rgba(255,59,59,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-battle-flash inline-block" /> LIVE
            </span>
          </div>
          <div className="flex gap-2">
            {(["all", "live", "waiting"] as const).map(f => (
              <button key={f} className="px-3 py-1 rounded text-xs font-bold transition-all" style={{
                background: battleFilter === f ? "var(--neon-green)" : "var(--card-bg)",
                color: battleFilter === f ? "#070b14" : "#4a5568",
                border: `1px solid ${battleFilter === f ? "var(--neon-green)" : "var(--card-border)"}`,
              }} onClick={() => setBattleFilter(f)}>
                {f === "all" ? "ВСЕ" : f === "live" ? "ИДУТ" : "ЖДУТ"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {battles.filter((b: any) => battleFilter === "all" || b.status === battleFilter).map((battle: any) => (
            <BattleCard key={battle.id} battle={battle} />
          ))}
        </div>
      </section>

      {/* Cases */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-blue)", boxShadow: "0 0 10px var(--neon-blue)" }} />
            <h2 className="font-russo text-xl text-white">ПОПУЛЯРНЫЕ КЕЙСЫ</h2>
          </div>
          <button className="btn-outline text-sm py-2 px-4" onClick={() => setPage("cases")}>ВСЕ КЕЙСЫ</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cases.map((c: any) => (
            <div key={c.id} className="game-card p-4 text-center cursor-pointer shine-effect" style={{ border: `1px solid ${c.border}` }} onClick={() => setPage("cases")}>
              <div className="text-4xl mb-3 animate-float" style={{ filter: `drop-shadow(0 0 12px ${c.color})` }}>{c.img}</div>
              <div className="font-russo text-xs mb-1" style={{ color: c.color }}>{c.name}</div>
              <div className="font-bold text-sm text-white">₽{c.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ========== BATTLE CARD ==========
function BattleCard({ battle }: { battle: any }) {
  const total = battle.p1Score + battle.p2Score;
  const p1Percent = total > 0 ? (battle.p1Score / total) * 100 : 50;

  return (
    <div className="game-card p-5 shine-effect">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold px-2 py-1 rounded" style={{
          background: battle.status === "live" ? "rgba(255,59,59,0.12)" : battle.status === "waiting" ? "rgba(0,255,135,0.08)" : "rgba(100,100,100,0.08)",
          color: battle.status === "live" ? "#ff3b3b" : battle.status === "waiting" ? "var(--neon-green)" : "#4a5568",
          border: `1px solid ${battle.status === "live" ? "rgba(255,59,59,0.25)" : battle.status === "waiting" ? "rgba(0,255,135,0.2)" : "rgba(100,100,100,0.15)"}`,
        }}>
          {battle.status === "live" ? "● LIVE" : battle.status === "waiting" ? "ОЖИДАНИЕ" : "ЗАВЕРШЁН"}
        </span>
        <span style={{ color: "var(--neon-gold)", fontWeight: 700, fontSize: "15px" }}>₽{battle.bet}</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-xl" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}>👤</div>
          <div className="font-bold text-sm text-white">{battle.player1}</div>
          {battle.status !== "waiting" && (
            <div className="font-russo text-2xl mt-1" style={{ color: "var(--neon-blue)" }}>{battle.p1Score}</div>
          )}
        </div>
        <div className="vs-divider">VS</div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 text-xl" style={{
            background: battle.player2 === "???" ? "transparent" : "rgba(191,90,242,0.1)",
            border: battle.player2 === "???" ? "2px dashed rgba(100,100,100,0.3)" : "1px solid rgba(191,90,242,0.25)",
          }}>
            {battle.player2 === "???" ? "+" : "👤"}
          </div>
          <div className="font-bold text-sm" style={{ color: battle.player2 === "???" ? "#3d4f6b" : "white" }}>{battle.player2}</div>
          {battle.status !== "waiting" && battle.player2 !== "???" && (
            <div className="font-russo text-2xl mt-1" style={{ color: "var(--neon-purple)" }}>{battle.p2Score}</div>
          )}
        </div>
      </div>

      {battle.status === "live" && (
        <div className="mt-4">
          <div className="battle-bar">
            <div style={{ width: `${p1Percent}%`, height: "100%", background: "linear-gradient(90deg, var(--neon-blue), var(--neon-green))", borderRadius: 4, transition: "width 1s ease" }} />
          </div>
          <div className="flex justify-between mt-1 text-xs" style={{ color: "#4a5568" }}>
            <span>{battle.p1Score} побед</span>
            <span>Раунд {battle.round}</span>
            <span>{battle.p2Score} побед</span>
          </div>
        </div>
      )}

      <button className="w-full mt-4 py-2 rounded-lg font-bold text-sm transition-all" style={{
        background: battle.player2 === "???" ? "linear-gradient(135deg, #00ff87, #00cc6a)" : battle.status === "live" ? "rgba(0,212,255,0.08)" : "rgba(100,100,100,0.08)",
        color: battle.player2 === "???" ? "#070b14" : battle.status === "live" ? "var(--neon-blue)" : "#4a5568",
        border: `1px solid ${battle.player2 === "???" ? "var(--neon-green)" : battle.status === "live" ? "rgba(0,212,255,0.25)" : "rgba(100,100,100,0.15)"}`,
      }}>
        {battle.player2 === "???" ? "ВСТУПИТЬ В БОЙ" : battle.status === "live" ? "СМОТРЕТЬ" : "РЕЗУЛЬТАТЫ"}
      </button>
    </div>
  );
}

// ========== CASES PAGE ==========
function CasesPage({ cases, balance, selectedCase, setSelectedCase, spinRoulette, isSpinning, spinPos, winItem, setWinItem }: any) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-blue)", boxShadow: "0 0 10px var(--neon-blue)" }} />
        <h1 className="font-russo text-2xl text-white">ВСЕ КЕЙСЫ</h1>
      </div>

      {selectedCase ? (
        <div className="animate-fade-up">
          <button className="flex items-center gap-2 mb-6 text-sm font-bold" style={{ color: "var(--neon-green)" }} onClick={() => { setSelectedCase(null); setWinItem(null); }}>
            <Icon name="ArrowLeft" size={16} /> НАЗАД К КЕЙСАМ
          </button>
          <div className="max-w-2xl mx-auto">
            <div className="game-card p-8 text-center" style={{ border: `1px solid ${selectedCase.border}` }}>
              <div className="text-7xl mb-4 animate-float" style={{ filter: `drop-shadow(0 0 20px ${selectedCase.color})` }}>{selectedCase.img}</div>
              <h2 className="font-russo text-3xl mb-2" style={{ color: selectedCase.color }}>{selectedCase.name}</h2>
              <p className="mb-6" style={{ color: "#4a5568" }}>
                Стоимость открытия: <span style={{ color: "var(--neon-gold)", fontWeight: 700 }}>₽{selectedCase.price}</span>
              </p>

              {/* Roulette */}
              <div className="relative mb-6 overflow-hidden rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", height: 120 }}>
                <div className="absolute top-0 bottom-0 left-1/2 z-10" style={{ width: 3, background: "var(--neon-green)", boxShadow: "0 0 15px var(--neon-green)", transform: "translateX(-50%)" }} />
                <div className="absolute inset-y-0 left-0 w-20 z-10" style={{ background: "linear-gradient(to right, var(--card-bg), transparent)" }} />
                <div className="absolute inset-y-0 right-0 w-20 z-10" style={{ background: "linear-gradient(to left, var(--card-bg), transparent)" }} />
                <div className="flex items-center h-full" style={{ transform: `translateX(${spinPos}px)`, willChange: "transform" }}>
                  {[...ROULETTE_ITEMS, ...ROULETTE_ITEMS, ...ROULETTE_ITEMS, ...ROULETTE_ITEMS, ...ROULETTE_ITEMS, ...ROULETTE_ITEMS].map((item, i) => (
                    <div key={i} className="roulette-item mx-1">{item}</div>
                  ))}
                </div>
              </div>

              {winItem && (
                <div className="py-4 px-6 rounded-xl mb-6" style={{ background: "rgba(0,255,135,0.08)", border: "1px solid rgba(0,255,135,0.25)" }}>
                  <p style={{ color: "var(--neon-green)", fontWeight: 700 }}>🎉 Вы выиграли: <span className="text-2xl ml-2">{winItem}</span></p>
                </div>
              )}

              <button
                className="btn-neon-green font-russo text-lg w-full"
                onClick={() => spinRoulette(selectedCase)}
                disabled={isSpinning || balance < selectedCase.price}
                style={{ opacity: (isSpinning || balance < selectedCase.price) ? 0.5 : 1 }}
              >
                {isSpinning ? "КРУТИТСЯ..." : balance < selectedCase.price ? "НЕТ СРЕДСТВ" : `ОТКРЫТЬ ЗА ₽${selectedCase.price}`}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cases.map((c: any) => (
            <div key={c.id} className="game-card p-6 cursor-pointer shine-effect" style={{ border: `1px solid ${c.border}` }} onClick={() => setSelectedCase(c)}>
              <div className="text-center mb-5">
                <div className="text-6xl mb-3 animate-float" style={{ filter: `drop-shadow(0 0 15px ${c.color})` }}>{c.img}</div>
                <h3 className="font-russo text-xl" style={{ color: c.color }}>{c.name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-russo text-xl text-white">₽{c.price}</div>
                  <div style={{ color: "#4a5568", fontSize: "12px" }}>{c.players} игроков открыли</div>
                </div>
                <div className="px-3 py-1 rounded text-xs font-bold uppercase" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                  {c.rarity === "legendary" ? "ЛЕГЕНД." : c.rarity === "epic" ? "ЭПИК" : c.rarity === "rare" ? "РЕДКИЙ" : "ОБЫЧНЫЙ"}
                </div>
              </div>
              <div className="mt-4 progress-bar">
                <div className="progress-fill" style={{ width: `${Math.min((c.players / 500) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========== PROFILE ==========
function ProfilePage({ balance }: { balance: number }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-purple)", boxShadow: "0 0 10px var(--neon-purple)" }} />
        <h1 className="font-russo text-2xl text-white">МОЙ ПРОФИЛЬ</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="game-card p-6 text-center">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl" style={{ background: "linear-gradient(135deg, #bf5af2, #00d4ff)", boxShadow: "0 0 30px rgba(191,90,242,0.35)" }}>👤</div>
          <h3 className="font-russo text-xl mb-1 text-white">PLAYER_ONE</h3>
          <p style={{ color: "#4a5568", fontSize: "13px" }}>Уровень 42 • Профи</p>
          <div className="mt-4 progress-bar"><div className="progress-fill" style={{ width: "65%" }} /></div>
          <p style={{ color: "#4a5568", fontSize: "11px", marginTop: 6 }}>650 / 1000 XP до уровня 43</p>
          <button className="btn-outline w-full mt-4 text-sm">РЕДАКТИРОВАТЬ</button>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: "Баланс", value: `₽${balance.toLocaleString()}`, icon: "Wallet", color: "var(--neon-gold)" },
            { label: "Побед в батлах", value: "247", icon: "Trophy", color: "var(--neon-green)" },
            { label: "Открыто кейсов", value: "1,841", icon: "Package", color: "var(--neon-blue)" },
            { label: "Процент побед", value: "61%", icon: "TrendingUp", color: "var(--neon-purple)" },
          ].map((stat, i) => (
            <div key={i} className="game-card p-5">
              <Icon name={stat.icon as any} size={22} style={{ color: stat.color, marginBottom: 10 }} />
              <div className="font-russo text-2xl" style={{ color: stat.color }}>{stat.value}</div>
              <div style={{ color: "#4a5568", fontSize: "12px", fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="game-card p-6 mt-6">
        <h3 className="font-russo text-base mb-4" style={{ color: "var(--neon-green)" }}>ПОСЛЕДНИЕ ИГРЫ</h3>
        <div className="space-y-3">
          {[
            { vs: "DARK_WOLF", result: "ПОБЕДА", amount: 1200, case: "NEON STRIKE" },
            { vs: "SHADOW_X", result: "ПОРАЖЕНИЕ", amount: -500, case: "GOLD RUSH" },
            { vs: "ACE_KING", result: "ПОБЕДА", amount: 800, case: "INFERNO" },
            { vs: "ZERO_7", result: "ПОБЕДА", amount: 300, case: "ARCTIC" },
          ].map((game, i) => (
            <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid var(--card-border)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{
                  background: game.amount > 0 ? "rgba(0,255,135,0.08)" : "rgba(255,59,59,0.08)",
                  border: `1px solid ${game.amount > 0 ? "rgba(0,255,135,0.2)" : "rgba(255,59,59,0.2)"}`,
                }}>
                  {game.amount > 0 ? "🏆" : "💀"}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">vs {game.vs}</div>
                  <div style={{ color: "#4a5568", fontSize: "12px" }}>{game.case}</div>
                </div>
              </div>
              <div className="font-bold" style={{ color: game.amount > 0 ? "var(--neon-green)" : "#ff3b3b" }}>
                {game.amount > 0 ? "+" : ""}₽{Math.abs(game.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== RATING ==========
function RatingPage({ players }: { players: typeof TOP_PLAYERS }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-gold)", boxShadow: "0 0 10px var(--neon-gold)" }} />
        <h1 className="font-russo text-2xl text-white">РЕЙТИНГ ИГРОКОВ</h1>
      </div>
      <div className="space-y-3">
        {players.map((player, i) => (
          <div key={player.rank} className="game-card p-4 shine-effect flex items-center gap-4" style={{
            border: i === 0 ? "1px solid rgba(255,215,0,0.4)" : i === 1 ? "1px solid rgba(192,192,192,0.25)" : i === 2 ? "1px solid rgba(205,127,50,0.25)" : "1px solid var(--card-border)"
          }}>
            <div className="font-russo text-lg w-8 text-center" style={{ color: i === 0 ? "var(--neon-gold)" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#4a5568" }}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${player.rank}`}
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: i < 3 ? "rgba(255,215,0,0.08)" : "rgba(100,100,100,0.08)", border: `1px solid ${i < 3 ? "rgba(255,215,0,0.2)" : "rgba(100,100,100,0.15)"}` }}>
              {player.avatar}
            </div>
            <div className="flex-1">
              <div className="font-bold text-white">{player.name}</div>
              <div style={{ color: "#4a5568", fontSize: "12px" }}>{player.wins} побед • {player.winrate}% винрейт</div>
            </div>
            <div className="text-right">
              <div className="font-russo text-base" style={{ color: "var(--neon-green)" }}>+₽{player.profit.toLocaleString()}</div>
              <div style={{ color: "#4a5568", fontSize: "11px" }}>прибыль</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== SHOP ==========
function ShopPage({ items, balance, setBalance }: any) {
  const [bought, setBought] = useState<number[]>([]);

  const buy = (item: typeof SHOP_ITEMS[0]) => {
    if (balance >= item.price && !bought.includes(item.id)) {
      setBalance((b: number) => b - item.price);
      setBought(prev => [...prev, item.id]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-gold)", boxShadow: "0 0 10px var(--neon-gold)" }} />
          <h1 className="font-russo text-2xl text-white">МАГАЗИН</h1>
        </div>
        <div className="px-4 py-2 rounded-lg font-bold text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--neon-gold)" }}>
          Баланс: ₽{balance.toLocaleString()}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item: any) => {
          const s = getRarityStyle(item.rarity);
          const isBought = bought.includes(item.id);
          return (
            <div key={item.id} className="game-card p-5 shine-effect" style={{ border: `1px solid ${s.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  {item.emoji}
                </div>
                <div>
                  <div className="text-xs px-2 py-0.5 rounded font-bold uppercase mb-1 inline-block" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                    {item.rarity}
                  </div>
                  <div className="font-bold text-white text-sm">{item.name}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-russo text-xl" style={{ color: "var(--neon-gold)" }}>₽{item.price.toLocaleString()}</span>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                  style={{
                    background: isBought ? "rgba(0,255,135,0.08)" : balance >= item.price ? "linear-gradient(135deg, #00ff87, #00cc6a)" : "rgba(100,100,100,0.08)",
                    color: isBought ? "var(--neon-green)" : balance >= item.price ? "#070b14" : "#3d4f6b",
                    border: `1px solid ${isBought ? "rgba(0,255,135,0.3)" : balance >= item.price ? "transparent" : "rgba(100,100,100,0.15)"}`,
                  }}
                  onClick={() => buy(item)}
                  disabled={balance < item.price || isBought}
                >
                  {isBought ? "✓ КУПЛЕНО" : balance < item.price ? "НЕТ СРЕДСТВ" : "КУПИТЬ"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== SUPPORT ==========
function SupportPage() {
  const [msg, setMsg] = useState("");
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 rounded-full" style={{ background: "var(--neon-blue)", boxShadow: "0 0 10px var(--neon-blue)" }} />
        <h1 className="font-russo text-2xl text-white">ПОДДЕРЖКА</h1>
      </div>
      <div className="grid gap-4 mb-8">
        {[
          { icon: "MessageCircle", title: "Онлайн чат", desc: "Ответим в течение 5 минут", color: "var(--neon-green)" },
          { icon: "Mail", title: "Email", desc: "support@neonbattle.gg", color: "var(--neon-blue)" },
          { icon: "BookOpen", title: "FAQ", desc: "Частые вопросы и ответы", color: "var(--neon-purple)" },
        ].map((item, i) => (
          <div key={i} className="game-card p-4 flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}>
              <Icon name={item.icon as any} size={20} style={{ color: item.color }} />
            </div>
            <div className="flex-1">
              <div className="font-bold text-white text-sm">{item.title}</div>
              <div style={{ color: "#4a5568", fontSize: "12px" }}>{item.desc}</div>
            </div>
            <Icon name="ChevronRight" size={16} style={{ color: "#3d4f6b" }} />
          </div>
        ))}
      </div>
      <div className="game-card p-6">
        <h3 className="font-russo text-base mb-4" style={{ color: "var(--neon-green)" }}>НАПИСАТЬ В ПОДДЕРЖКУ</h3>
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-bold text-white mb-2">Обращение отправлено!</p>
            <p style={{ color: "#4a5568", fontSize: "13px" }}>Мы ответим в течение 24 часов</p>
            <button className="btn-outline mt-6 text-sm" onClick={() => { setSent(false); setMsg(""); setTopic(""); }}>Новое обращение</button>
          </div>
        ) : (
          <>
            <select
              className="w-full px-4 py-3 rounded-lg mb-3 font-medium text-sm outline-none"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: topic ? "white" : "#4a5568" }}
              value={topic}
              onChange={e => setTopic(e.target.value)}
            >
              <option value="">Выберите тему обращения</option>
              <option value="balance">Проблема с балансом</option>
              <option value="tech">Технические неполадки</option>
              <option value="battle">Вопрос по батлам</option>
              <option value="other">Другое</option>
            </select>
            <textarea
              className="w-full px-4 py-3 rounded-lg resize-none mb-4 text-sm outline-none"
              rows={5}
              placeholder="Опишите проблему подробно..."
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "white" }}
              value={msg}
              onChange={e => setMsg(e.target.value)}
            />
            <button
              className="btn-neon-green w-full font-russo"
              onClick={() => msg.trim() && topic && setSent(true)}
              style={{ opacity: msg.trim() && topic ? 1 : 0.5 }}
            >
              ОТПРАВИТЬ
            </button>
          </>
        )}
      </div>
    </div>
  );
}