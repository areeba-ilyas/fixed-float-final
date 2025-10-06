'use client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { MdContentPaste, MdQrCodeScanner } from 'react-icons/md';

type RateItem = {
  from: string;
  to: string;
  in: number;
  out: number;
  amount: number;
  tofee: string;
  minamount: number;
  maxamount: number;
  type: 'fixed'|'float';
};

// Color mapping for different cryptocurrencies
const coinColors: Record<string, string> = {
  'TON': '#0088cc',
  'BNB': '#f3ba2f',
  'BTC': '#f7931a',
  'ETH': '#627eea',
  'USDT': '#26a17b',
  'USDC': '#2775ca',
  'SOL': '#00ffbd',
  'XRP': '#23292f',
  'ADA': '#0033ad',
  'DOGE': '#c3a634',
  'DOT': '#e6007a',
  'AVAX': '#e84142',
  'MATIC': '#8247e5',
  'LTC': '#bfbbbb',
  'TRX': '#ff060a',
  'LINK': '#2a5ada',
  'XLM': '#000000',
  'BCH': '#8dc351',
  'ETC': '#339c53',
  'XMR': '#ff6600',
  'EOS': '#000000',
  'XTZ': '#a6e000',
  'ATOM': '#2e3148',
  'ALGO': '#000000',
  'ZEC': '#ecb244',
  'DASH': '#008de4',
  'NEAR': '#000000',
  'FTM': '#1969ff',
  'SAND': '#00adef',
  'MANA': '#ff2d55',
  'ENJ': '#624dbf',
  'GALA': '#00ffab',
  'THETA': '#2ab8e6',
  'BAT': '#ff5000',
  'COMP': '#00d395',
  'MKR': '#1aab9b',
  'UNI': '#ff007a',
  'AAVE': '#2ebac6',
  'YFI': '#006ae3',
  'SNX': '#00d1ff',
  'CRV': '#40649f',
  'SUSHI': '#fa52a0',
  '1INCH': '#000000',
  'REN': '#001c3a',
  'BAND': '#516aff',
  'OCEAN': '#000000',
  'NMR': '#8d1b3d',
  'REP': '#000000',
  'LRC': '#2ab6f6',
  'OMG': '#1a53f0',
  'ZRX': '#000000',
  'KNC': '#31cb9e',
  'BAL': '#1e1e1e',
  'UMA': '#ff4a4a',
  'BADGER': '#c5a158',
  'PICKLE': '#3d7c28',
  'CVP': '#000000',
  'FARM': '#8b8000',
  'AKRO': '#00d2ff',
  'HEGIC': '#000000',
  'COVER': '#000000',
  'CREAM': '#7dffd3',
  'SWRV': '#000000',
  'SXP': '#ff5cb8',
  'TRB': '#000000',
  'ORN': '#000000',
  'PERP': '#000000',
  'RUNE': '#000000',
  'SFI': '#000000',
  'TOMO': '#000000',
  'WAVES': '#000000',
  'ZIL': '#000000',
};

export default function Hero() {
  const [darkMode, setDarkMode] = useState(false);

  // existing UI state (unchanged)
  const [amountSend, setAmountSend] = useState('15.6682');
  const [amountReceive, setAmountReceive] = useState('0.064973');
  const [selectedOrderType, setSelectedOrderType] = useState<'fixed' | 'float'>('float');
  const [rates, setRates] = useState<RateItem[]>([]);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [sendCurrency, setSendCurrency] = useState<string>('TON');
  const [receiveCurrency, setReceiveCurrency] = useState<string>('BNB');
  const [showSendDropdown, setShowSendDropdown] = useState<boolean>(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState<boolean>(false);
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  // Get coin color - fallback to default colors if not found
  const getCoinColor = (symbol: string): string => {
    return coinColors[symbol] || (darkMode ? '#38B6FF' : '#117DBF');
  };

  const getReceiveCoinColor = (symbol: string): string => {
    return coinColors[symbol] || (darkMode ? '#FDD15D' : '#FDD15D');
  };

  // Current colors based on selected coins
  const sendCoinColor = useMemo(() => getCoinColor(sendCurrency), [sendCurrency, darkMode]);
  const receiveCoinColor = useMemo(() => getReceiveCoinColor(receiveCurrency), [receiveCurrency, darkMode]);

  // --- Helpers
  const getCurrencyIcon = (symbol: string) =>
    `https://ff.io/assets/images/coins/svg/${symbol.toLowerCase()}.svg`;

  const currentPair: RateItem | undefined = useMemo(
    () => rates.find(r => r.from === sendCurrency && r.to === receiveCurrency),
    [rates, sendCurrency, receiveCurrency]
  );

  const sendPerReceive = useMemo(() => {
    if (!currentPair) return null;
    const a = currentPair.out / (currentPair.in || 1); // 1 send = a receive
    const b = (currentPair.in || 1) / currentPair.out; // 1 receive = b send
    return { a, b };
  }, [currentPair]);

  // --- Fetch rates whenever order type changes
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`/api/fixedfloat/coin-rate?type=${selectedOrderType}`, { cache: 'no-store' });
        const data = await res.json();
        const items: RateItem[] = data?.rates ?? [];
        setRates(items);

        const syms = new Set<string>();
        items.forEach(i => { syms.add(i.from); syms.add(i.to); });
        setCurrencies(Array.from(syms).sort());

        if (items.length && !items.find(i => i.from === sendCurrency && i.to === receiveCurrency)) {
          setSendCurrency(items[0].from);
          setReceiveCurrency(items[0].to);
        }
      } catch (err) {
        console.error('Error fetching rates:', err);
      }
    };
    fetchRates();
  }, [selectedOrderType]); // eslint-disable-line

  // --- Recompute receive amount whenever amountSend or pair changes
  useEffect(() => {
    if (!sendPerReceive) return;
    const fromVal = parseFloat(amountSend || '0');
    if (!isFinite(fromVal) || fromVal <= 0) return setAmountReceive('');
    const est = fromVal * sendPerReceive.a;
    setAmountReceive(est ? String(est) : '');
  }, [amountSend, sendPerReceive]); // eslint-disable-line

  // --- Dark mode
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'true' || (!stored && prefersDark)) setDarkMode(true);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // --- UI handlers
  const handlePaste = async () => {
    try { setDestinationAddress(await navigator.clipboard.readText()); }
    catch (err) { console.error('Failed to read clipboard:', err); }
  };
  const handleSelectSend = (cur: string) => { setSendCurrency(cur); setShowSendDropdown(false); };
  const handleSelectReceive = (cur: string) => { setReceiveCurrency(cur); setShowReceiveDropdown(false); };

  const handleSwapCurrencies = () => {
    const tmp = sendCurrency;
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(tmp);
    const tmpAmt = amountSend;
    setAmountSend(amountReceive);
    setAmountReceive(tmpAmt);
  };

  const perUnit = (pair: RateItem) => pair.out / (pair.in || 1);
  const computeReceive = (sendAmt: number, pair?: RateItem) =>
    pair ? sendAmt * perUnit(pair) : 0;

  const clampToMinMax = (amt: number, pair?: RateItem) => {
    if (!pair) return amt;
    if (pair.minamount && amt < pair.minamount) return pair.minamount;
    if (pair.maxamount && amt > pair.maxamount) return pair.maxamount;
    return amt;
  };

  useEffect(() => {
    if (!currentPair) return;
    const isPlaceholder = amountSend === '' || amountSend === '15.6682';
    const base = isPlaceholder ? currentPair.minamount : parseFloat(amountSend || '0');
    const clamped = clampToMinMax(isNaN(base) ? currentPair.minamount : base, currentPair);
    const recv = computeReceive(clamped, currentPair);
    setAmountSend(String(clamped));
    setAmountReceive(recv ? String(recv) : '');
  }, [currentPair]); // run

  return (
   <section className="relative isolate w-full overflow-visible">
  <div className="min-h-[90vh] md:min-h-[1100px] relative">
    {/* BACKGROUNDS (behind) */}
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden -mt-[36rem]">
      {darkMode ? (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_dark/space.svg" alt="Dark Space" />
      ) : (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_light/sky.svg?001" alt="Light Sky" />
      )}

      {darkMode ? (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_dark/planets.svg" alt="Dark Planets" />
      ) : (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_light/planets_summer.svg" alt="Light Planets" />
      )}

      {darkMode ? (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_dark/ground.svg" alt="Dark Ground" />
      ) : (
        <img className="absolute inset-0 w-full h-full object-cover" src="/assets/images/background/mainbg/theme_light/ground.svg?001" alt="Light Ground" />
      )}
    </div>

    {/* CONTENT (front) */}
    <div className="relative z-30 w-full max-w-[1100px] mx-auto px-4 mt-6">
      <div className="pt-12 md:pt-44 text-center">
        <h1 className={`text-2xl md:text-5xl font-semibold drop-shadow-md ${darkMode ? 'text-[#DEEFFF]' : 'text-[#232323]'}`}>
          Lightning cryptocurrency exchange
        </h1>
      </div>

      <div className="mt-6 md:mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-[940px]">
          {/* MOBILE LAYOUT - Stacked */}
          <div className="flex flex-col w-full text-white font-medium md:hidden">
            {/* SEND SECTION - Mobile */}
            <div className="w-full">
              <div className="flex justify-between text-sm px-2 mb-1" style={{ color: sendCoinColor }}>
                <span>Send</span>
                <span>{sendCurrency}</span>
              </div>

              <div
                className={`flex items-center justify-between border-2 rounded-xl px-3 py-2 ${
                  darkMode ? 'bg-[#0D111C]' : 'bg-white'
                }`}
                style={{ borderColor: sendCoinColor }}
              >
                <input
                  type="text"
                  style={{ color: sendCoinColor }}
                  value={amountSend}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setAmountSend(raw);
                    const n = parseFloat(raw || '0');
                    if (!currentPair || !isFinite(n) || n <= 0) { setAmountReceive(''); return; }
                    const clamped = clampToMinMax(n, currentPair);
                    const recv = computeReceive(clamped, currentPair);
                    setAmountReceive(recv ? String(recv) : '');
                  }}
                  className="bg-transparent outline-none text-lg w-full max-w-[120px]"
                />

                <div className="relative">
                  <button
                    onClick={() => setShowSendDropdown(!showSendDropdown)}
                    className="flex items-center gap-1 ml-2"
                  >
                    <img src={getCurrencyIcon(sendCurrency)} alt={sendCurrency} width={32} height={32} />
                    <span style={{ color: sendCoinColor }} className="text-sm">{sendCurrency}</span>
                    <svg className="w-3 h-3" style={{ color: sendCoinColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showSendDropdown && (
                    <div 
                      className="absolute right-0 mt-1 w-40 bg-[#0D111C] border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto"
                      style={{ borderColor: sendCoinColor }}
                    >
                      <ul>
                        {currencies.map((cur) => (
                          <li
                            key={`send-${cur}`}
                            onClick={() => handleSelectSend(cur)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-opacity-20 cursor-pointer transition-colors"
                            style={{ 
                              backgroundColor: cur === sendCurrency ? `${sendCoinColor}20` : 'transparent'
                            }}
                          >
                            <img src={getCurrencyIcon(cur)} alt={cur} width={20} height={20} className="w-5 h-5" />
                            <span className="text-white text-sm">{cur}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-xs px-2 mt-1">
                <span className={`${darkMode ? 'text-[#DEEFFF]' : 'text-black/70'}`}>
                  {sendPerReceive ? (
                    <>1 {sendCurrency} = {sendPerReceive.a.toFixed(6)} {receiveCurrency}</>
                  ) : <>—</>
                  }
                </span>
              </div>
            </div>

            {/* MOBILE SWAP BUTTON */}
          {/* Mobile Swap Button (shows only on mobile) */}
<div className="flex items-center justify-end -my-2  md:hidden">
  <button
    onClick={handleSwapCurrencies}
    className="w-10 h-10 flex items-center justify-center rounded-full rotate-90 transition"
  >
    <svg
      width="29px"
      height="29px"
      viewBox="-1.26 -1.26 23.52 23.52"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <g
        transform="translate(2 4)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m4.5 8.5-4 4 4 4" style={{ stroke: sendCoinColor }} />
        <path d="m12.5 12.5h-12" style={{ stroke: sendCoinColor }} />
      </g>
      <g
        transform="translate(2 1)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m8.5.5 4 4-4 4" style={{ stroke: receiveCoinColor }} />
        <path d="m12.5 4.5h-12" style={{ stroke: receiveCoinColor }} />
      </g>
    </svg>
  </button>
</div>


            {/* RECEIVE SECTION - Mobile */}
            <div className="w-full">
              <div className="flex justify-between text-sm px-2 mb-1" style={{ color: receiveCoinColor }}>
                <span>Receive</span>
                <span>{receiveCurrency}</span>
              </div>

              <div
                className={`flex items-center justify-between border-2 rounded-xl px-3 py-2 ${
                  darkMode ? 'bg-[#16130A]' : 'bg-white'
                }`}
                style={{ borderColor: receiveCoinColor }}
              >
                <input
                  type="text"
                  value={amountReceive}
                  onChange={(e) => setAmountReceive(e.target.value)}
                  className="bg-transparent outline-none text-lg w-full max-w-[120px]"
                  style={{ color: receiveCoinColor }}
                  readOnly
                />

                <div className="relative">
                  <button
                    onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
                    className="flex items-center gap-1 ml-2"
                  >
                    <img src={getCurrencyIcon(receiveCurrency)} alt={receiveCurrency} width={32} height={32} />
                    <span style={{ color: receiveCoinColor }} className="text-sm">{receiveCurrency}</span>
                    <svg className="w-3 h-3" style={{ color: receiveCoinColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showReceiveDropdown && (
                    <div 
                      className="absolute right-0 mt-1 w-40 bg-[#16130A] border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto"
                      style={{ borderColor: receiveCoinColor }}
                    >
                      <ul>
                        {currencies.map((cur) => (
                          <li
                            key={`receive-${cur}`}
                            onClick={() => handleSelectReceive(cur)}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-opacity-20 cursor-pointer transition-colors"
                            style={{ 
                              backgroundColor: cur === receiveCurrency ? `${receiveCoinColor}20` : 'transparent',
                              color: cur === receiveCurrency ? receiveCoinColor : 'white'
                            }}
                          >
                            <img src={getCurrencyIcon(cur)} alt={cur} width={20} height={20} className="w-5 h-5" />
                            <span className="text-sm">{cur}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex justify-between text-xs px-2 mt-1 ${darkMode ? 'text-[#DEEFFF]' : 'text-black/70'}`}>
                <span>
                  {sendPerReceive ? (
                    <>1 {receiveCurrency} = {sendPerReceive.b.toFixed(6)} {sendCurrency}</>
                  ) : <>—</>
                  }
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT - Side by Side */}
          <div className="hidden md:flex flex-row gap-6 w-full text-white font-medium">
            {/* LEFT - SEND */}
            <div className="w-full max-w-[460px]">
              <div className="flex justify-between text-sm px-4 mb-1" style={{ color: sendCoinColor }}>
                <span>Send</span>
                <span>{sendCurrency}</span>
              </div>

              <div
                className={`flex items-center justify-between border rounded-xl px-4 py-3 ${
                  darkMode ? 'bg-[#0D111C]' : 'bg-white'
                }`}
                style={{ borderColor: sendCoinColor }}
              >
                <input
                  type="text"
                  style={{ color: sendCoinColor }}
                  value={amountSend}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setAmountSend(raw);
                    const n = parseFloat(raw || '0');
                    if (!currentPair || !isFinite(n) || n <= 0) { setAmountReceive(''); return; }
                    const clamped = clampToMinMax(n, currentPair);
                    const recv = computeReceive(clamped, currentPair);
                    setAmountReceive(recv ? String(recv) : '');
                  }}
                  className={`bg-transparent outline-none text-2xl w-full max-w-[150px] ${
                    darkMode ? 'text-white' : 'text-[#232323]'
                  }`}
                />

                <div className="relative">
                  <button
                    onClick={() => setShowSendDropdown(!showSendDropdown)}
                    className="flex items-center gap-2 ml-4"
                  >
                    <img src={getCurrencyIcon(sendCurrency)} alt={sendCurrency} width={46} height={36} />
                    <span style={{ color: sendCoinColor }}>{sendCurrency}</span>
                    <svg className="w-4 h-4" style={{ color: sendCoinColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showSendDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-[#0D111C] border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                      style={{ borderColor: sendCoinColor }}
                    >
                      <ul>
                        {currencies.map((cur) => (
                          <li
                            key={`send-${cur}`}
                            onClick={() => handleSelectSend(cur)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-opacity-20 cursor-pointer transition-colors"
                            style={{ 
                              backgroundColor: cur === sendCurrency ? `${sendCoinColor}20` : 'transparent'
                            }}
                          >
                            <img src={getCurrencyIcon(cur)} alt={cur} width={24} height={24} className="w-6 h-6" />
                            <span className="text-white">{cur}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-xs px-4 mt-1">
                <span className={`${darkMode ? 'text-[#DEEFFF]' : 'text-black/70'}`}>
                  {sendPerReceive ? (
                    <>1 {sendCurrency} = {sendPerReceive.a.toFixed(6)} {receiveCurrency}</>
                  ) : <>—</>
                  }
                </span>
              </div>
            </div>

            {/* DESKTOP SWAP BUTTON */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleSwapCurrencies}
                className="p-2 rounded-full hover:bg-gray-700 transition"
              >
                <svg width="30px" height="30px" viewBox="-1.26 -1.26 23.52 23.52" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g transform="translate(2 4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="m4.5 8.5-4 4 4 4" style={{ stroke: sendCoinColor }}/>
                    <path d="m12.5 12.5h-12" style={{ stroke: sendCoinColor }}/>
                  </g>
                  <g transform="translate(2 1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="m8.5.5 4 4-4 4" style={{ stroke: receiveCoinColor }}/>
                    <path d="m12.5 4.5h-12" style={{ stroke: receiveCoinColor }}/>
                  </g>
                </svg>
              </button>
            </div>

            {/* RIGHT - RECEIVE */}
            <div className="w-full max-w-[460px]">
              <div className="flex justify-between text-sm px-4 mb-1" style={{ color: receiveCoinColor }}>
                <span>Receive</span>
                <span>{receiveCurrency}</span>
              </div>

              <div
                className={`flex items-center justify-between border rounded-xl px-6 py-3 ${
                  darkMode ? 'bg-[#16130A]' : 'bg-white'
                }`}
                style={{ borderColor: receiveCoinColor }}
              >
                <input
                  type="text"
                  value={amountReceive}
                  onChange={(e) => setAmountReceive(e.target.value)}
                  className="bg-transparent outline-none text-2xl w-full max-w-[150px]"
                  style={{ color: receiveCoinColor }}
                  readOnly
                />

                <div className="relative">
                  <button
                    onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
                    className="flex items-center gap-2 ml-4"
                  >
                    <img src={getCurrencyIcon(receiveCurrency)} alt={receiveCurrency} width={46} height={36} />
                    <span style={{ color: receiveCoinColor }}>{receiveCurrency}</span>
                    <svg className="w-4 h-4" style={{ color: receiveCoinColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showReceiveDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-[#16130A] border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
                      style={{ borderColor: receiveCoinColor }}
                    >
                      <ul>
                        {currencies.map((cur) => (
                          <li
                            key={`receive-${cur}`}
                            onClick={() => handleSelectReceive(cur)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-opacity-20 cursor-pointer transition-colors"
                            style={{ 
                              backgroundColor: cur === receiveCurrency ? `${receiveCoinColor}20` : 'transparent',
                              color: cur === receiveCurrency ? receiveCoinColor : 'white'
                            }}
                          >
                            <img src={getCurrencyIcon(cur)} alt={cur} width={24} height={24} className="w-6 h-6" />
                            <span>{cur}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex justify-between text-xs px-4 mt-1 ${darkMode ? 'text-[#DEEFFF]' : 'text-black/70'}`}>
                <span>
                  {sendPerReceive ? (
                    <>1 {receiveCurrency} = {sendPerReceive.b.toFixed(6)} {sendCurrency}</>
                  ) : <>—</>
                  }
                </span>
              </div>
            </div>
          </div>

          {/* DESTINATION - Responsive */}
          <div className="w-full">
            <div className="flex justify-between text-sm px-2 md:px-4 mb-1">
              <span className={`${darkMode ? 'text-[#DEEFFF]' : 'text-[#232323]'}`}>Destination</span>
            </div>

            <div
              className={`flex items-center justify-between border rounded-xl px-3 md:px-4 py-3 md:py-5 opacity-70 ${
                darkMode ? 'bg-[#0D111C]' : 'bg-white'
              }`}
              style={{ borderColor: darkMode ? '#117DBF' : '#CCC' }}
            >
              <input
  type="text"
  value={destinationAddress}
  onChange={(e) => setDestinationAddress(e.target.value)}
  placeholder={`Enter your ${receiveCurrency} address`}
  className={`bg-transparent outline-none w-full text-sm md:text-base md:text-lg ${
    darkMode ? 'text-white placeholder-white/50' : 'text-[#232323] placeholder-black/20'
  }`}
/>


              <div className="flex items-center gap-2 md:gap-3 ml-2 md:ml-4">
                <button title="Paste" onClick={handlePaste}>
                  <MdContentPaste className={`text-xl md:text-3xl ${darkMode ? 'text-white' : 'text-[#232323]'}`} />
                </button>

                <button title="Scan QR">
                  <MdQrCodeScanner className={`text-xl md:text-3xl ${darkMode ? 'text-white' : 'text-[#232323]'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ORDER TYPE + CTA - Responsive */}
        <div className="w-full mt-4 md:mt-6 space-y-3">
  {/* Mobile Layout */}
  <div className="md:hidden flex flex-col gap-3">
    {/* Order Type Label */}
    <span className={`text-lg font-semibold ${darkMode ? 'text-[#DEEFFF]' : 'text-[#232323]'}`}>
      Order type
    </span>
    
    {/* Buttons and Question Mark Row */}
    <div className="flex items-center gap-2 w-full">
      <div className="flex border rounded-xl overflow-hidden flex-1">
        <button
          className={`px-4 py-3 text-sm transition-colors flex-1 text-center ${
            selectedOrderType === 'fixed'
              ? 'text-[#38B6FF] border'
              : `${darkMode ? 'bg-[#0D111C] opacity-70' : 'bg-white'}`
          }`}
          style={{ 
            borderColor: selectedOrderType === 'fixed' ? '#38B6FF' : 'transparent',
            borderRadius: selectedOrderType === 'fixed' ? '0.75rem 0 0 0.75rem' : '0'
          }}
          onClick={() => setSelectedOrderType('fixed')}
        >
          Fixed rate (1.0%)
        </button>

        <button
          className={`px-4 py-3 text-sm transition-colors flex-1 text-center ${
            selectedOrderType === 'float'
              ? 'text-[#38B6FF] border'
              : `${darkMode ? 'bg-[#0D111C] opacity-70' : 'bg-white'}`
          }`}
          style={{ 
            borderColor: selectedOrderType === 'float' ? '#38B6FF' : 'transparent',
            borderRadius: selectedOrderType === 'float' ? '0 0.75rem 0.75rem 0' : '0'
          }}
          onClick={() => setSelectedOrderType('float')}
        >
          Float rate (0.5%)
        </button>
      </div>

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
          darkMode ? 'bg-[#1C1C24] text-white/70' : 'bg-[#F0F0F0] text-[#232323]'
        }`}
      >
        ?
      </div>
    </div>

    {/* Exchange Now Button - Full width on mobile */}
    <Link href={'/order'} className="w-full flex items-center justify-center mt-2">
      <button className="bg-[#008FDF] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition px-6 text-center text-sm">
        Exchange now
      </button>
    </Link>
  </div>

  {/* Desktop Layout */}
  <div className="hidden md:flex flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <span className={`text-xl font-semibold ${darkMode ? 'text-[#DEEFFF]' : 'text-[#232323]'}`}>
        Order type
      </span>

      <div
        className={`flex border rounded-xl overflow-hidden ${
          darkMode ? 'bg-[#0D111C] opacity-70' : 'bg-white'
        }`}
        style={{ borderColor: darkMode ? '#117DBF' : '#CCC' }}
      >
        <button
          className={`px-8 py-4 text-sm transition-colors ${
            selectedOrderType === 'fixed'
              ? 'text-[#38B6FF] border rounded-l-xl'
              : `${darkMode ? 'bg-transparent text-white/50' : 'bg-transparent text-[#232323]/50'}`
          }`}
          style={{ borderColor: selectedOrderType === 'fixed' ? '#38B6FF' : 'transparent' }}
          onClick={() => setSelectedOrderType('fixed')}
        >
          Fixed rate (1.0%)
        </button>

        <button
          className={`px-8 py-4 text-sm transition-colors ${
            selectedOrderType === 'float'
              ? 'rounded-r-xl text-[#38B6FF] border'
              : `${darkMode ? 'bg-transparent text-white/50' : 'bg-transparent text-[#232323]/50'}`
          }`}
          style={{ borderColor: selectedOrderType === 'float' ? '#38B6FF' : 'transparent' }}
          onClick={() => setSelectedOrderType('float')}
        >
          Float rate (0.5%)
        </button>
      </div>

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold ${
          darkMode ? 'bg-[#1C1C24] text-white/70' : 'bg-[#F0F0F0] text-[#232323]'
        }`}
      >
        ?
      </div>
    </div>
    
    <Link href={'/order'} className="flex-shrink-0">
      <button className="bg-[#008FDF] text-white font-semibold px-8 py-3 rounded-lg text-xl hover:opacity-90 transition">
        Exchange now
      </button>
    </Link>
  </div>

  {/* Terms Text - Same for both */}
 <p
  className={`text-xs md:text-sm font-normal text-center md:text-left ${
    darkMode ? 'text-white/40' : 'text-[#232323]/60'
  }`}
>
  By using the site and creating an exchange, you agree to the FixedFloat's{' '}
  <a href="#" className="text-[#38B6FF] hover:underline">
    Terms of Services
  </a>{' '}
  and{' '}
  <a href="#" className="text-[#38B6FF] hover:underline">
    Privacy Policy
  </a>
  .
</p>

</div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}