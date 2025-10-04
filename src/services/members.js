import { apiNest, ENDPOINTS } from "../config";

export const getMemberProfile = (type, search) => {
  return apiNest.get(
    `${ENDPOINTS.MEMBERS.PROFILE}?type=${type}&search=${search}&is_active=true`
  );
};