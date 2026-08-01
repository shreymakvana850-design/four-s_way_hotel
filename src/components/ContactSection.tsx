import React, { useState } from 'react';
<<<<<<< HEAD
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Crown } from 'lucide-react';

export const ContactSection: React.FC = () => {
=======
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Crown, ArrowLeft } from 'lucide-react';

interface ContactSectionProps {
  isStandalonePage?: boolean;
  onGoBack?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isStandalonePage, onGoBack }) => {
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Room Stay Reservation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in required Name and Phone number.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-stone-950 text-stone-100 relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
<<<<<<< HEAD
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
=======

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative">
          {onGoBack && (
            <div className="flex justify-center sm:justify-start mb-4">
              <button
                onClick={onGoBack}
                className="inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs px-4 py-2 rounded-full font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          )}
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-serif uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
            <MapPin className="w-3.5 h-3.5" /> Direct Contact & Location
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
            Connect With The Royal Desk
          </h2>
          <p className="text-stone-300 text-sm">
            We are eager to assist you with room reservations, banquet planning, dining reservations, or airport transfer assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
<<<<<<< HEAD
          
=======

>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
          {/* Left: Contact Info & Map Box */}
          <div className="space-y-6">
            <div className="bg-stone-900 border border-amber-900/40 p-6 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" /> Palace Address & Support
              </h3>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3">
<<<<<<< HEAD
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 flex-shrink-0">
=======
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-200 block">Property Location:</strong>
                    Four's Way Hotel, Sheikh Zayed Road, Downtown Dubai, Near Burj Khalifa, Dubai – United Arab Emirates.
                  </div>
                </div>

                <div className="flex items-start gap-3">
<<<<<<< HEAD
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 flex-shrink-0">
=======
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-200 block">Phone & WhatsApp:</strong>
                    <p className="font-mono text-stone-200">+91 92743 96643</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
<<<<<<< HEAD
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 flex-shrink-0">
=======
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-200 block">Email Desk:</strong>
                    <p className="font-mono text-stone-200">infofourswayhotel@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
<<<<<<< HEAD
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 flex-shrink-0">
=======
                  <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-amber-200 block">Front Desk Hours:</strong>
                    24/7 Royal Concierge & Guest Services
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Location Map Card */}
            <div className="bg-stone-900 border border-amber-900/40 p-4 rounded-2xl shadow-xl space-y-2">
              <p className="text-xs font-serif font-bold text-amber-300">📍 How To Reach:</p>
              <p className="text-[11px] text-stone-400">
                Located on Sheikh Zayed Road in Downtown Dubai, just 10 minutes from Dubai International Airport (DXB) and 5 minutes from Burj Khalifa & Dubai Mall.
              </p>
              <div className="w-full h-36 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-center text-xs text-amber-400 font-mono">
                [ Google Map Pin: Sheikh Zayed Road, Downtown Dubai, UAE ]
              </div>
            </div>
          </div>

          {/* Right: Direct Inquiry Form */}
          <div className="bg-stone-900 border border-amber-900/40 p-8 rounded-2xl shadow-2xl space-y-6">
            <h3 className="text-2xl font-serif font-bold text-amber-100">
              Send Direct Royal Inquiry
            </h3>

            {submitted ? (
              <div className="bg-amber-950/80 border border-amber-500/60 p-6 rounded-xl text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="text-lg font-serif font-bold text-amber-100">Inquiry Received</h4>
                <p className="text-xs text-stone-300">
                  Thank you, <strong>{name}</strong>! Our Royal Concierge will contact you within 2 hours at <span className="font-mono text-amber-300">{phone}</span> to confirm details.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-700 text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maharaval Digvijay Singh"
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-amber-300 font-serif font-semibold">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 92743 96643"
                      className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-amber-300 font-serif font-semibold">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="guest@example.com"
                      className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Inquiry Type</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Room Stay Reservation">Room Stay Reservation</option>
                    <option value="Destination Royal Wedding">Destination Royal Wedding</option>
                    <option value="Sheesh Mahal Fine Dining Table">Sheesh Mahal Fine Dining Table</option>
                    <option value="Corporate Event / Summit">Corporate Event / Summit</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-amber-300 font-serif font-semibold">Message / Requests</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention expected dates, guest count, or special preferences..."
                    className="w-full bg-stone-950 border border-amber-900/60 rounded-xl p-3 text-stone-100 outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
<<<<<<< HEAD
                  className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs py-3.5 rounded-xl shadow-xl cursor-pointer flex items-center justify-center gap-2 transition-all"
=======
                  className="w-full bg-linear-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-xs py-3.5 rounded-xl shadow-xl cursor-pointer flex items-center justify-center gap-2 transition-all"
>>>>>>> 086ae4c44501e58da82521f9dca7fa9f0b513b99
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry To Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
