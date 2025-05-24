import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactInfo } from '../data/propertyData';
import { Phone, Mail, MessageSquare, User, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_lastname: '',
    from_email: '',
    from_phone: '',
    message: '',
    contact_method: 'email',
    to_email: contactInfo.email // Add recipient email from contactInfo
  });
  
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormData({
        from_name: '',
        from_lastname: '',
        from_email: '',
        from_phone: '',
        message: '',
        contact_method: 'email',
        to_email: contactInfo.email
      });

      alert(t('contact.success'));
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    return isRTL ? phone.replace('+', '') + '+' : phone;
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 order-2 lg:order-1">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg sticky top-24">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  {t('contact.direct')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className={`${isRTL ? 'order-last mr-4' : 'mr-4'}`}>
                      <Phone size={24} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{formatPhoneNumber(contactInfo.phone)}</p>
                      <p className="text-sm text-gray-500">{t('contact.available')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`${isRTL ? 'order-last mr-4' : 'mr-4'}`}>
                      <Mail size={24} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{contactInfo.email}</p>
                      <p className="text-sm text-gray-500">{t('contact.response')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors duration-300"
                    >
                      <MessageSquare size={20} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t('contact.whatsapp')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-2/3 order-1 lg:order-2">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                  {t('contact.title')}
                </h2>
                <p className="text-xl text-gray-600">
                  {t('contact.subtitle')}
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Add hidden input for recipient email */}
                <input
                  type="hidden"
                  name="to_email"
                  value={formData.to_email}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.firstName')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors`}
                        placeholder={t('contact.firstName.placeholder')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="from_lastname" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.lastName')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="from_lastname"
                        name="from_lastname"
                        value={formData.from_lastname}
                        onChange={handleChange}
                        required
                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors`}
                        placeholder={t('contact.lastName.placeholder')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.email')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        required
                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors`}
                        placeholder={t('contact.email.placeholder')}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="from_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.phone')}
                    </label>
                    <div className="relative">
                      <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="from_phone"
                        name="from_phone"
                        value={formData.from_phone}
                        onChange={handleChange}
                        className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors`}
                        placeholder={t('contact.phone.placeholder')}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact_method" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.preferred')}
                  </label>
                  <select
                    id="contact_method"
                    name="contact_method"
                    value={formData.contact_method}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                  >
                    <option value="email">{t('contact.preferred.email')}</option>
                    <option value="phone">{t('contact.preferred.phone')}</option>
                    <option value="whatsapp">{t('contact.preferred.whatsapp')}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-colors"
                    placeholder={t('contact.message.placeholder')}
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className={`${isRTL ? 'ml-2' : 'mr-2'} animate-spin`} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t('contact.send')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;