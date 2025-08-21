import {Author} from "@/types/post";
import {apiRequest} from "@/lib/apiRequest";

export const getAuthorById = async (id: string): Promise<Author> => {
    try {
      return apiRequest(`/api/authors/${id}`);
    } catch (error) {
      console.error("Author fetch error:", error);
      throw error;
    }
}