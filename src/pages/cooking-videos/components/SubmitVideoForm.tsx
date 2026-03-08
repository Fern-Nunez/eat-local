
import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const SUBMIT_URL = 'https://readdy.ai/api/form/d6fp5kn1jbcgr9kd73o0';

const cuisineOptions = [
  'Italian', 'Mexican', 'Chinese', 'Thai', 'Indian', 'Lebanese',
  'Japanese', 'Ethiopian', 'Korean', 'Greek', 'Vietnamese', 'Caribbean',
  'Moroccan', 'Peruvian', 'Filipino', 'Turkish', 'Other',
];

export default function SubmitVideoForm({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const description = formData.get('video_description') as string;
    if (description && description.length > 500) return;
    const reason = formData.get('why_recommend') as string;
    if (reason && reason.length > 500) return;

    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    setSubmitting(true);
    try {
      await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-double-fill text-4xl text-orange-600"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('submitVideo.successTitle')}</h3>
          <p className="text-gray-600 mb-6">{t('submitVideo.successMsg')}</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t('submitVideo.backToVideos')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <i className="ri-youtube-fill text-xl text-red-600"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{t('submitVideo.title')}</h3>
              <p className="text-xs text-gray-500">{t('submitVideo.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        <form
          id="submit-video-form"
          data-readdy-form
          onSubmit={handleSubmit}
          className="p-8"
        >
          {/* Your Info */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="ri-user-line text-orange-500"></i>
              {t('submitVideo.yourInfo')}
            </h4>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.yourName')}</label>
                <input
                  type="text"
                  name="submitter_name"
                  required
                  placeholder={t('submitVideo.yourNamePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.yourEmail')}</label>
                <input
                  type="email"
                  name="email"
                  placeholder={t('submitVideo.yourEmailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Video Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="ri-film-line text-orange-500"></i>
              {t('submitVideo.videoDetails')}
            </h4>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.youtubeUrl')}</label>
                <div className="relative">
                  <i className="ri-link absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="url"
                    name="video_url"
                    required
                    placeholder={t('submitVideo.youtubeUrlPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.videoTitle')}</label>
                <input
                  type="text"
                  name="video_title"
                  required
                  placeholder={t('submitVideo.videoTitlePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.cuisineType')}</label>
                  <select
                    name="cuisine_type"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
                  >
                    <option value="">{t('submitVideo.selectCuisine')}</option>
                    {cuisineOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.channelName')}</label>
                  <input
                    type="text"
                    name="channel_name"
                    required
                    placeholder={t('submitVideo.channelNamePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.dishName')}</label>
                <input
                  type="text"
                  name="dish_name"
                  required
                  placeholder={t('submitVideo.dishNamePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('submitVideo.description')}</label>
                <textarea
                  name="video_description"
                  rows={3}
                  maxLength={500}
                  placeholder={t('submitVideo.descriptionPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                ></textarea>
                <p className="text-xs text-gray-400 mt-1">{t('submitVideo.maxChars')}</p>
              </div>
            </div>
          </div>

          {/* Why Recommend */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-8">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="ri-heart-line text-red-500"></i>
              {t('submitVideo.whyVideo')}
            </h4>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('submitVideo.qualitiesLabel')}
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(
                    ['submitVideo.tag1', 'submitVideo.tag2', 'submitVideo.tag3', 'submitVideo.tag4',
                     'submitVideo.tag5', 'submitVideo.tag6', 'submitVideo.tag7'] as const
                  ).map((tagKey) => (
                    <label
                      key={tagKey}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 text-sm"
                    >
                      <input type="checkbox" name="video_qualities" value={t(tagKey)} className="accent-orange-600 w-3.5 h-3.5" />
                      <span className="text-gray-700">{t(tagKey)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('submitVideo.whyRecommend')}
                </label>
                <textarea
                  name="why_recommend"
                  rows={2}
                  maxLength={500}
                  placeholder={t('submitVideo.whyRecommendPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none bg-white"
                ></textarea>
                <p className="text-xs text-gray-400 mt-1">{t('submitVideo.maxChars')}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('submitVideo.difficulty')}
                </label>
                <div className="flex gap-3">
                  {(
                    ['submitVideo.diff1', 'submitVideo.diff2', 'submitVideo.diff3'] as const
                  ).map((diffKey) => (
                    <label
                      key={diffKey}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50"
                    >
                      <input type="radio" name="difficulty_level" value={t(diffKey)} className="accent-orange-600" />
                      <span className="text-sm text-gray-700">{t(diffKey)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <i className="ri-loader-4-line text-xl animate-spin"></i>
                {t('submitVideo.submitting')}
              </>
            ) : (
              <>
                <i className="ri-send-plane-fill text-lg"></i>
                {t('submitVideo.submitBtn')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
