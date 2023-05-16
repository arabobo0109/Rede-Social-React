
export default function getAuthHeader() {
    const token = localStorage.getItem("accessToken") as string
    const userId = localStorage.getItem("profile") as string;
    
    const authHeader = {
      headers: {
          Authorization: `Bearer ${token}`,
          RequestedBy: userId
      }
    }
    return authHeader;
}
