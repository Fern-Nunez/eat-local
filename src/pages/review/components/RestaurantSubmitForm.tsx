import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cuisineTypes } from '../../../mocks/restaurants';
import { supabase } from '../../../lib/supabase';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

export default function RestaurantSubmitForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const restaurantName = formData.get('restaurant_name')?.toString().trim() || '';
    const cuisine = formData.get('cuisine_type')?.toString().trim() || '';
    const address = formData.get('address')?.toString().trim() || '';
    const submitterName = formData.get('submitter_name')?.toString().trim() || '';
    const submitterEmail = formData.get('email')?.toString().trim() || '';
    const reason = formData.get('reason')?.toString().trim() || '';
    const imageUrl = formData.get('image_url')?.toString().trim() || '';

    setSubmitting(true);
    setSubmitError('');

    try {
      const geoRes = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${MAPBOX_TOKEN}&limit=1`
      );

      const geoData = await geoRes.json();
      const feature = geoData?.features?.[0];

      if (!feature) {
        setSubmitError('Could not find that address. Please enter a more complete address.');
        setSubmitting(false);
        return;
      }

      const [lng, lat] = feature.center;

      const descriptionParts = [reason].filter(Boolean).join(' | ');

      const payload = {
        restaurant_name: restaurantName,
        cuisine,
        address,
        submitter_name: submitterName || null,
        submitter_email: submitterEmail || null,
        reason: reason || null,
        description: descriptionParts || null,
        image_url: imageUrl || null,
        lat,
        lng,
        status: 'pending'
      };

      const { error } = await supabase
        .from('restaurant_submissions')
        .insert([payload]);

      if (error) {
        setSubmitError(error.message);
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError('Something went wrong while submitting the restaurant.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-line text-4xl text-teal-600"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {t('restForm.successTitle')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('restForm.successMsg')}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('restForm.submitAnother')}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <i className="ri-store-2-line text-2xl text-orange-600"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{t('restForm.title')}</h3>
          <p className="text-sm text-gray-500">{t('restForm.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('restForm.restaurantName')}
          </label>
          <input
            type="text"
            name="restaurant_name"
            required
            placeholder={t('restForm.restaurantNamePlaceholder')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('restForm.cuisineType')}
          </label>
          <select
            name="cuisine_type"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer bg-white"
          >
            <option value="">{t('restForm.selectCuisine')}</option>
            {cuisineTypes.map((c) => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
            <option value="Other">{t('restForm.other')}</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('restForm.address')}
        </label>
        <input
          type="text"
          name="address"
          required
          placeholder={t('restForm.addressPlaceholder')}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image Link
          </label>
          <input
            type="url"
            name="image_url"
            placeholder="https://example.com/restaurant-photo.jpg"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('restForm.yourName')}
          </label>
          <input
            type="text"
            name="submitter_name"
            placeholder={t('restForm.yourNamePlaceholder')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('restForm.yourEmail')}
        </label>
        <input
          type="email"
          name="email"
          placeholder={t('restForm.yourEmailPlaceholder')}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('restForm.reason')}
        </label>
        <textarea
          name="reason"
          rows={3}
          maxLength={500}
          placeholder={t('restForm.reasonPlaceholder')}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
        ></textarea>
        <p className="text-xs text-gray-400 mt-1">{t('restForm.maxChars')}</p>
      </div>

      {submitError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <i className="ri-loader-4-line text-xl animate-spin"></i>
            {t('restForm.submitting')}
          </>
        ) : (
          <>
            <i className="ri-send-plane-fill text-lg"></i>
            {t('restForm.submitBtn')}
          </>
        )}
      </button>
    </form>
  );
}