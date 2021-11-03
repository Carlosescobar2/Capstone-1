import { db } from "./firebase";

const fetchUserData = async (user) => {
    try {
      let obj;
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      query.forEach(async (doc) => {
        obj = {
          username: doc.data().name,
          email: doc.data().email,
          uid: doc.data().uid,
        }
      });
      console.log(obj)
      return obj
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching user data");
    }
  }

  export {
      fetchUserData
  }