import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDealById } from "../services/api";

export default function DealDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const data = await getDealById(id);
        setDeal(data.deal);
      } catch (err) {
        setError("Failed to load deal details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ff5a5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !deal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-[16px]">{error || "Deal not found"}</p>
        <button
          onClick={() => navigate("/deals")}
          className="text-[#ff5a5f] font-medium hover:underline"
        >
          Back to Deals
        </button>
      </div>
    );
  }

  const details = [
    { label: "Deal Type", value: deal.dealType },
    { label: "Status", value: deal.dealStatus },
    { label: "Entry Fee", value: deal.entryFee ? `$${deal.entryFee.toLocaleString()}` : "-" },
    { label: "Assignment Fee", value: deal.assignmentFee ? `$${deal.assignmentFee.toLocaleString()}` : "-" },
    { label: "Loan Rate", value: deal.rateLoan ? `${(deal.rateLoan * 100).toFixed(2)}%` : "-" },
    { label: "PITI", value: deal.pitiLoan ? `$${deal.pitiLoan.toLocaleString()}` : "-" },
    { label: "Total Monthly", value: deal.totalMonthlyPayment ? `$${deal.totalMonthlyPayment.toLocaleString()}` : "-" },
    { label: "Bedrooms", value: deal.bedCount || "-" },
    { label: "Bathrooms", value: deal.bathCount || "-" },
    { label: "Furnished", value: deal.furnished || "-" },
    { label: "Pool", value: deal.hasPool || "-" },
    { label: "Multi-Unit", value: deal.multiUnit || "-" },
    { label: "HOA", value: deal.hoaRestrictions || "-" },
    { label: "Zip Code", value: deal.zipCode || "-" },
    { label: "COE Date", value: deal.coeDate || "-" },
  ].filter((d) => d.value && d.value !== "-");

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Top bar */}
      <div className="bg-white border-b border-black/[0.08] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/deals")}
            className="flex items-center gap-2 text-[14px] font-medium text-[#717171] hover:text-[#1a1a1a] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Deals
          </button>
          {deal.dealType && (
            <span
              className="bg-[#ff5a5f]/10 text-[#ff5a5f] text-[13px] font-medium px-3 py-1.5 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {deal.dealType}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden mb-8 bg-white border border-black/[0.08]">
          {deal.listingImageUrl ? (
            <img
              src={deal.listingImageUrl}
              alt={deal.address}
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <div className="w-full h-[400px] bg-[#f7f7f7] flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          )}
        </div>

        {/* Header info */}
        <div className="bg-white rounded-2xl border border-black/[0.08] p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1
                className="text-[32px] text-[#1a1a1a] leading-tight"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                {deal.entryFee ? `$${deal.entryFee.toLocaleString()}` : "Contact for Price"}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-[16px] text-[#717171]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{deal.fullAddress || `${deal.address}, ${deal.city}, ${deal.state}`}</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-8 pt-4 border-t border-black/[0.08]">
            {deal.bedCount && (
              <div className="flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l1-1V7a1 1 0 011-1h14a1 1 0 011 1v4l1 1M3 12v6h18v-6M3 12h18" />
                </svg>
                <span className="text-[18px] font-medium text-[#1a1a1a]">{deal.bedCount}</span>
                <span className="text-[14px] text-[#717171]">beds</span>
              </div>
            )}
            {deal.bathCount && (
              <div className="flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 12h16M4 12a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h9a2 2 0 012 2v3M4 12v5a2 2 0 002 2h12a2 2 0 002-2v-5" />
                </svg>
                <span className="text-[18px] font-medium text-[#1a1a1a]">{deal.bathCount}</span>
                <span className="text-[14px] text-[#717171]">baths</span>
              </div>
            )}
            {deal.totalMonthlyPayment && (
              <div className="flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[14px] text-[#717171]">Monthly:</span>
                <span className="text-[18px] font-medium text-[#1a1a1a]">${deal.totalMonthlyPayment.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Deal details grid */}
        <div className="bg-white rounded-2xl border border-black/[0.08] p-8">
          <h2
            className="text-[20px] text-[#1a1a1a] mb-6"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Deal Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
            {details.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[13px] text-[#717171] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </p>
                <p className="text-[16px] font-medium text-[#1a1a1a]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Google Drive link */}
          {deal.googleDriveStorage && (
            <div className="mt-8 pt-6 border-t border-black/[0.08]">
              <a
                href={deal.googleDriveStorage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ff5a5f] text-white text-[14px] font-bold px-6 py-3 rounded-xl shadow-[0_4px_6px_rgba(255,90,95,0.25)] hover:bg-[#e0484d] transition-all duration-200 active:scale-95"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Documents
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}