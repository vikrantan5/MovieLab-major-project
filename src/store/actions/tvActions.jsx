export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch) => {
  try {
    const [detail, externalid, recommendations, similar, translations, videos, watchproviders, credits, reviews] = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/translations`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`),
      axios.get(`/tv/${id}/credits`),
      axios.get(`/tv/${id}/reviews`),
    ]);

    const theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((m) => m.type === "Trailer") || videos.data.results[0],
      watchproviders: watchproviders.data.results.IN,
      credits: credits.data,
      reviews: reviews.data.results,
    };

    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.error("Error loading tv details:", error);
  }
};
