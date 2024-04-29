
export default function character({ post }) {
  return (
    <>{post}</>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`https://rickandmortyapi.com/api/character`);
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
  const post = await res.json();
  return { props: { post } };
}
