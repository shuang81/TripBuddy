import '../styles/App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Post from './Post';
import Profile from '../components/Profile';
import Browse from './Browse';
import Payment from '../components/Payment';
import Subscription from '../components/Subscription';
import NavigationBar from '../components/NavigationBar';
import Sample from './Sample';
import MyPosts from './MyPosts';
import NewPost from './NewPost';
import EditPost from './EditPost';
import SavedPosts from './SavedPosts';
import Status from '../components/Status';
import Manage from '../components/Manage';
import Security from '../components/Security';
import Emergency from '../components/Emergency';
import AdminFAQ from './AdminFAQ';
import FAQ from './FAQ';
import PostAnalytics from './PostAnalytics';
import OtherEmergencyContacts from './OtherEmergencyContacts';

const App = () => {
  return (
    <div className="app-container">
      <NavigationBar />

       <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home /> } />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/new-post" element={<NewPost /> } />
        <Route path="/profile" Component={Profile} />
        <Route path="/browse" element={<Browse /> } />
        <Route path="/payment" Component={Payment} />
        <Route path="/status" Component={Status} />
        <Route path="/manage" Component={Manage} />
        <Route path="/security" Component={Security} />
        <Route path="/subscription" Component={Subscription} />
        <Route path="/emergency" Component={Emergency} />
        <Route path="/sample" element={<Sample /> } />
        <Route path="/my-posts" element={<MyPosts /> } />
        <Route path="/my-posts/:postId" element={<Post mainUrl="/my-posts" showSaved={false}/> } />
        <Route path="/browse/:postId" element={<Post mainUrl="/browse" showSaved={true}/> } />
        <Route path="/my-posts/edit/:postId" element={<EditPost /> } />
        <Route path="/saved" element={<SavedPosts /> } />
        <Route path="/saved/:postId" element={<Post mainUrl="/saved" showSaved={true}/>  } />
        <Route path="/admin/faq" element={<AdminFAQ />  } />
        <Route path="/faq" element={<FAQ />  } />
        <Route path="/analytics/:id" element={<PostAnalytics />  } />
        <Route path="/emergency-info" element={<OtherEmergencyContacts />} />
       </Routes>
    </div>
  );
}

export default App;
