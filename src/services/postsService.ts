import Axios from "axios";
import { Post } from "../interfaces";

const baseUrl = "http://localhost:4000/posts";

async function getAll(): Promise<Post[]> {
  const { data: posts } = await Axios.get<Post[]>(baseUrl);
  return posts;
}

export default { getAll };
