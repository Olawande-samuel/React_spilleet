import React from 'react';
import axios from 'axios'
const InterestContext = React.createContext();

export default InterestContext;

export const Context = React.createContext();

export const Fetch = (url, formData) => {
    return axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };
export const List = [ 
    {
        id: 1,
        title:"Society"
    },
    {
        id: 2,
        title:"Mental fact"
    },
    {
        id: 3,
        title:"Memes"
    },
    {
        id: 4,
        title:"Family"
    },
    {
        id: 5,
        title:"Healthcare"
    },
    {
        id: 6,
        title:"Dating"
    },
    {
        id: 7,
        title:"Politics"
    },
    {
        id: 8,
        title:"Art"
    },
    {
        id: 9,
        title:"Technology"
    },
    {
        id: 10,
        title:"School"
    },
    {
        id: 11,
        title:"Agriculture"
    },
    {
        id: 12,
        title:"Economics"
    }
]
export const Items = {
    NavLinks: [ 
        {
            id: 1,
            title:"Home",
            link:"/"
        },
        {
            id: 2,
            title:"Profile",
            link: "/user/profile"
        },
        
        {
            id: 3,
            title:"Contact us",
            link:'/contact-us'
        }
        
    ],

    Posts: [
        {
            id: 1,
            user:"Odeleye Dorcas",
            image:"Npolice.png",
            date:"Oct 24",
            time:"2hrs ago",
            title:"The horrible view of Nigerian Police?",
            content:' In Emily Ratajkowski"s new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            likes:"45.6k",
            comments:"674",
            status:"Following",
            type:"article"
        },
        {
            id: 2,
            user:"Obotunde. I",
            profile:"profile.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"45.6k",
            title:"'I wasn't just famous; I was famously sexy': Model Florence Smith on the dangers of being desired.",
            content:' In Emily Ratajkowskis new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            comments:"674",
            status:"Following",
            type:"text"
        },
        {
            id: 3,
            user:"Iyanda. O",
            profile:"adefola.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"45.6k",
            title:"'I wasn't just famous; I was famously sexy': Model Florence Smith on the dangers of being desired.",
            content:' In Emily Ratajkowskis new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            comments:"674",
            status:"Following",
            type:"text"
        },
        {
            id: 4,
            user:"Testimony. C",
            profile:"adefola.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"45.6k",
            title:"'I wasn't just famous; I was famously sexy': Model Florence Smith on the dangers of being desired.",
            content:'In Emily Ratajkowski"s new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            comments:"674",
            status:"Following",
            type:"text"
        },
        {
            id: 5,
            user:"Rahmoni. H",
            profile:"profile.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"45.6k",
            title:"'I wasn't just famous; I was famously sexy': Model Florence Smith on the dangers of being desired.",
            content:' In Emily Ratajkowski"s new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            comments:"674",
            status:"Following",
            type:"text"
        },
        {
            id: 6,
            user:"Adefolabomi. A",
            profile:"adefola.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"45.6k",
            title:"'I wasn't just famous; I was famously sexy': Model Florence Smith on the dangers of being desired.",
            content:' In Emily Ratajkowski& new essay collection, "My Body, " the story of Audrey Munson, the teenager dubbed "Americas first supermodel," serves as a powerful reminder of the perils of being idolized. Having posed for some of the early 20th century great sculptors, Munson can today be found at parks, plazas and state capitols across America. after inspiring several high-profile statues.',
            comments:"674",
            status:"Following",
            type:"text"
        }
        
    ],

    comments:[
        {
            id: 1,
            user:"Seyi. A",
            profile:"adefola.png",
            date:"Oct 24",
            time:"2hrs ago",
            likes:"265",
            content:'Some people might be like “oh but he should be keeping his private life private”. I 100% guarantee that if the principal had announced he was marrying a woman, nothing would have happened to him. I hope he sues the hell out of that school district.',
            reply:"6",
            status:"Following"
        },
        {
            id: 2,
            user:"Shola Michael",
            profile:"profile.png",
            date:"Sunday",
            time:"2hrs ago",
            likes:"87",
            content:'My favourite colour changes from time to time, one day it will be blue, the next will be black, then pastel pink, then a couple weeks later, it will be charcoal grey, then a light teal, then for a month, it will be millennial pink, if I knew a guy like that, I would prefer him to get rainbow coloured gifts in a rainbow coloured bag. ',
            reply:"3",
            status:"Following"
        },
    ],
    category: [
        {
            id: 1,
            title:"Family",
            image:"family.png"
        },
        {
            id: 2,
            title:"Politics",
            image:"politics.png"

        },
        {
            id: 3,
            title:"Mental fact",
            image:"mental.png"

        },
        {
            id: 4,
            title:"Health",
            image:"health.png"

        },

        
    ], 
    followers: [
        {
            id: 1,
            name:"Adebola Olumide",
            image:"userprofile.png",
            about: "Studying Economics, Geography",
            followers: "47",

        },
        {
            id: 2,
            name:"Kolade Matthew",
            image:"randomuser2.png",
            about: "Interested in Human behaviour",
            followers: "32.2K",

        },
        {
            id: 3,
            name:"Abdullahi Azeez .B",
            image:"randomuser.png",
            about: "Professional Videographer",
            followers: "567",

        },
        {
            id: 4,
            name:"Adebola Olumide",
            image:"randomuser3.png",
            about: "Studying Economics, Geography",
            followers: "467",

        },
    ], 
    notifications:[
        {
            id: 1,
            name:"Folake Oluwanifemi",
            image:"userprofile.png",
            action: "Sent you a message",
            text: '“Hello, can you give me a summary about your topic”.',
        },
        {
            id: 2,
            name:"Kolade Matthew",
            image:"randomuser2.png",
            action: "Replied to your comment",
            text: '“Hello, can you give me a summary about your topic”.',

        },
        {
            id: 3,
            name:"Folake Oluwanifemi",
            image:"randomuser.png",
            action: "Just started following you",
            text: '“Hello, can you give me a summary about your topic”.',

        },
        {
            id: 4,
            name:"Kolade Matthew",
            image:"randomuser3.png",
            action: "Just started following you",
            text: '“Hello, can you give me a summary about your topic”.',

        },
    ]

}




