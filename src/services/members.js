import { apiNest, ENDPOINTS } from "../config";

export const getMemberProfile = (type, search) => {
  return apiNest.get(
    `${ENDPOINTS.MEMBERS.PROFILE}?type=${type}&search=${search}&is_active=true`
  );
};

export const updateOshimen = (payload) => {
  return apiNest.patch(
    `${ENDPOINTS.USER.UPDATE_OSHIMEN}/${payload.user_id}`, payload
  );
};

export const getScheduleOshimen = (memberId) => {
  return apiNest.get(
    `${ENDPOINTS.MEMBERS.SCHEDULE}/${memberId}`
  );
};
