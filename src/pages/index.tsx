import { useRouter } from "next/router";
import { useEffect } from "react";

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin");
  }, [router]);
  return null;
}

export default IndexPage;
