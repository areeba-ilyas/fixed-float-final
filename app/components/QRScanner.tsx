// QRScanner component ko ye simple version se replace karein
function QRScanner({ onAddressScanned }: { onAddressScanned: (address: string) => void }) {
  console.log("QRScanner component loaded"); // Debug line
  
  const handleClick = () => {
    console.log("Scan button clicked"); // Debug line
    const demoAddress = 'TQDz3Nze6y1E7ZA6qdqMm6QmutQxzzo3Qa';
    onAddressScanned(demoAddress);
    alert(`QR Code Scanned!\nAddress: ${demoAddress}`);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm px-3 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <span>📷</span>
        Scan QR Code
      </button>
    </div>
  );
}