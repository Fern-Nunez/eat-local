import { useEffect, useMemo, useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cuisineTypes } from '../../../mocks/restaurants';
import { supabase } from '../../../lib/supabase';

type RestaurantRow = {
  id: string;
  name: string;
  cuisine: string | null;
};

export default function ExperienceReviewForm() {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [restaurants, setRestaurants] = useState<RestaurantRow[]>([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      setLoadingRestaurants(true);

      const { data, error } = await supabase
        .from('restaurants')
        .select('id, name, cuisine')
        .eq('approved', true)
        .eq('is_chain', false)
        .order('name', { ascending: true });

      if (error) {
        setSubmitError(error.message);
        setLoadingRestaurants(false);
        return;
      }

      setRestaurants((data || []) as RestaurantRow[]);
      setLoadingRestaurants(false);
    }

    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (!selectedCuisine) return restaurants;
    return restaurants.filter((r) => r.cuisine === selectedCuisine);
  }, [restaurants, selectedCuisine]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (rating === 0) {
      setSubmitError('Please select a rating.');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const reviewer_name = formData.get('reviewer_name')?.toString().trim() || '';
    const reviewer_email = formData.get('reviewer_email')?.toString().trim() || '';
    const restaurant_id = formData.get('restaurant_id')?.toString().trim() || '';
    const review_text = formData.get('review_text')?.toString().trim() || '';

    if (!restaurant_id) {
      setSubmitError('Please select a restaurant.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      const { error } = await supabase.from('reviews').insert([
        {
          restaurant_id,
          reviewer_name,
          reviewer_email: reviewer_email || null,
          rating,
          review_text: review_text || null
        }
      ]);

      if (error) {
        setSubmitError(error.message);
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      form.reset();
      setRating(0);
      setSelectedCuisine('');
    } catch {
      setSubmitError('Something went wrong while submitting your review.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-heart-fill text-4xl text-teal-600"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {t('expForm.successTitle')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('expForm.successMsg')}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('expForm.shareAnother')}
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
        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
          <i className="ri-chat-heart-line text-2xl text-teal-600"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{t('expForm.title')}</h3>
          <p className="text-sm text-gray-500">{t('expForm.subtitle')}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Review Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="reviewer_name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="reviewer_email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all cursor-pointer bg-white"
            >
              <option value="">All Cuisines</option>
              {cuisineTypes.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Restaurant *
            </label>
            <select
              name="restaurant_id"
              required
              disabled={loadingRestaurants}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all cursor-pointer bg-white disabled:bg-gray-100"
            >
              <option value="">
                {loadingRestaurants ? 'Loading restaurants...' : 'Select a restaurant'}
              </option>
              {filteredRestaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.cuisine || 'Other'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
          Rating *
        </label>

        <div className="flex items-center gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-3xl cursor-pointer"
            >
              <i
                className={
                  star <= rating
                    ? 'ri-star-fill text-yellow-500'
                    : 'ri-star-line text-gray-300'
                }
              ></i>
            </button>
          ))}
        </div>

        {rating > 0 && (
          <p className="mt-3 text-sm font-medium text-gray-600">
            Selected rating: {rating}/5
          </p>
        )}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Review
        </label>
        <textarea
          name="review_text"
          rows={4}
          maxLength={500}
          placeholder="Share your experience..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all resize-none"
        ></textarea>
      </div>

      {submitError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || rating === 0}
        className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <i className="ri-loader-4-line text-xl animate-spin"></i>
            Submitting...
          </>
        ) : (
          <>
            <i className="ri-heart-fill text-lg"></i>
            Submit Review
          </>
        )}
      </button>
    </form>
  );
}