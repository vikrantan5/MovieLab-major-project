export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch) => {
  try {
    const [detail, externalid, recommendations, similar, translations, videos, watchproviders, credits, reviews] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/translations`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`),
      axios.get(`/movie/${id}/credits`),
      axios.get(`/movie/${id}/reviews`),
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

    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.error("Error loading movie details:", error);
  }
};
