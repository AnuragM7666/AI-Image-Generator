import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { GetPosts, deletePost } from '../api/index.js';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    padding: 30px 0 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: none;
    @media (max-width: 768px) {
        padding: 12px 0;
    }
`;

const Headline = styled.div`
    font-size: 34px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 600px) {
        font-size: 22px;
    }
`;

const Span = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.primary};
    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 32px 0;
    display: flex;
    justify-content: center;
`;

const CardWrapper = styled.div`
    display: grid;
    gap: 32px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 900px) {
        gap: 20px;
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 600px) {
        gap: 12px;
        grid-template-columns: repeat(1, 1fr);
    }
`;

const AboutSection = styled.section`
    width: 100%;
    max-width: 900px;
    margin: 48px auto 0 auto;
    padding: 32px 24px;
    background: ${({ theme }) => theme.bgLight};
    border-radius: 16px;
    box-shadow: 0 2px 16px 0 ${({ theme }) => theme.black + '10'};
    color: ${({ theme }) => theme.text_secondary};
    text-align: center;
    font-size: 1.1rem;
`;

const Footer = styled.footer`
    width: 100%;
    padding: 24px 0 12px 0;
    text-align: center;
    color: ${({ theme }) => theme.text_secondary};
    background: ${({ theme }) => theme.bgLight};
    margin-top: 40px;
    font-size: 1rem;
`;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const getPosts = async () => {
        setLoading(true);
        try {
            const res = await GetPosts();
            setPosts(res?.data?.data || []);
            setFilteredPosts(res?.data?.data || []);
        } catch (error) {
            setError(error?.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    // Search logic
    useEffect(() => {
        if (!search) {
            setFilteredPosts(posts);
            return;
        }
        const searchFilteredPosts = posts.filter((post) => {
            const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
            const authorMatch = post?.name?.toLowerCase().includes(search.toLowerCase());
            return promptMatch || authorMatch;
        });
        setFilteredPosts(searchFilteredPosts);
    }, [posts, search]);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await deletePost(id);
            setPosts((prev) => prev.filter((p) => p._id !== id));
            setFilteredPosts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to delete post.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <Container>
            <Headline>
                Explore popular posts in the Community!
                <Span>Generated with AI</Span>
            </Headline>
            <SearchBar search={search} setSearch={setSearch} />
            <Wrapper>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {loading ? (
                    <CircularProgress />
                ) : (
                    <CardWrapper>
                        {filteredPosts.length === 0 ? (
                            <>No Posts Found</>
                        ) : (
                            filteredPosts.slice().reverse().map((item, index) => (
                                <ImageCard key={index} item={item} onDelete={handleDelete} deleting={deletingId === item._id} />
                            ))
                        )}
                    </CardWrapper>
                )}
            </Wrapper>
            <AboutSection>
                <strong>About GenAI Image Generator</strong><br /><br />
                GenAI is an AI-powered image generator that lets you create unique images from text prompts using advanced generative models. Enter a creative prompt, generate an image, and share it with the community!<br /><br />
                <em>How it works:</em> Type a detailed description, generate an image, and post it for others to explore. You can also browse, download, and (now) delete images in the gallery.
            </AboutSection>
            <Footer>
                © {new Date().getFullYear()} GenAI Image Generator &nbsp;|&nbsp;
                <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>GitHub</a>
            </Footer>
        </Container>
    );
};

export default Home;
