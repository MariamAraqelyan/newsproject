import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeewsFeedComponent } from './neews-feed.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'trending'
      },
      {
        path: 'trending',
        component: NeewsFeedComponent,
        data: {
          category: 'trending',
          meta: {
            title: 'Trending News | Newsreel',
            description: 'View Trending news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/trending'
          }
        }
      },
      {
        path: 'politics',
        component: NeewsFeedComponent,
        data: {
          category: 'politics',
          meta: {
            title: 'Politics News | Newsreel',
            description: 'View Politics news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/politics'
          }
        }
      },
      {
        path: 'celebrity',
        component: NeewsFeedComponent,
        data: {
          category: 'celebrity',
          meta: {
            title: 'Celebrity News | Newsreel',
            description: 'View Celebrity news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/celebrity'
          }
        }
      },
      {
        path: 'business',
        component: NeewsFeedComponent,
        data: {
          category: 'business',
          meta: {
            title: 'Business News | Newsreel',
            description: 'View Business news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/business'
          }
        }
      },
      {
        path: 'influencer',
        component: NeewsFeedComponent,
        data: {
          category: 'influencer',
          meta: {
            title: 'Influencer News | Newsreel',
            description: 'View Influencer news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/influencer'
          }
        }
      },
      {
        path: 'health',
        component: NeewsFeedComponent,
        data: {
          category: 'health',
          meta: {
            title: 'Health News | Newsreel',
            description: 'View Health news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/health'
          }
        }
      },
      {
        path: 'music',
        component: NeewsFeedComponent,
        data: {
          category: 'music',
          meta: {
            title: 'Music News | Newsreel',
            description: 'View Music news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/music'
          }
        }
      },
      {
        path: 'sports',
        component: NeewsFeedComponent,
        data: {
          category: 'sports',
          meta: {
            title: 'Sports News | Newsreel',
            description: 'View Sports news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/sports'
          }
        }
      },
      {
        path: 'gaming',
        component: NeewsFeedComponent,
        data: {
          category: 'gaming',
          meta: {
            title: 'Gaming News | Newsreel',
            description: 'View Gaming news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/gaming'
          }
        }
      },
      {
        path: 'technology',
        component: NeewsFeedComponent,
        data: {
          category: 'technology',
          meta: {
            title: 'Technology News | Newsreel',
            description: 'View Technology news on Newsreel the world\'s first crowdsourced news platform where news is created and rated by the people for the people.',
            url: 'newsreel.io/news/technology'
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeewsFeedRoutingModule { }
