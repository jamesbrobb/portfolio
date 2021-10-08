export const routeComponentsConfig = {

    routesMenu: {
        items: [
            {   label: 'styles',
                children: [
                    { label: 'colors', path: '/styles/colors' },
                    { label: 'typography', path: '/styles/typography' },
                    { label: 'grid', path: '/styles/grid' },
                    { label: 'icons', path: '/styles/icons' },
                    { label: 'svg', path: '/styles/svg' },
                ]
            },
            {
                label: 'applications',
                children: [
                    { label: 'lesson-item-renderer', path: 'applications/ef-class-lesson-item-renderer-app' },
                    { label: 'lesson-simulation', path: 'applications/ef-class-lesson-simulation-app' }
                ]
            },
            {
                label: 'components',
                children: [
                    {
                        label: 'common',
                        children: [
                            {
                                label: 'svg',
                                children: [
                                    { label: 'svg', path: '/components/ef-class-svg' },
                                    { label: 'rounded-corner-svg', path: '/components/ef-class-rounded-corner-svg'}
                                ]
                            },
                            { label: 'icon',  path: '/components/ef-class-icon' },
                            {
                                label: 'html',
                                children: [
                                    { label: 'html-renderer', path: '/components/ef-class-html-renderer' },
                                    { label: 'html-highlighting', path: '/components/ef-class-html-highlighting-text' }
                                ]

                            },
                            {
                                label: 'buttons',
                                children: [
                                    { label: 'basic', path: '/components/ef-class-button-basic' },
                                    { label: 'custom',
                                        children: [
                                            { label: 'google',
                                                children: [
                                                    { label: 'sign in', path: '/components/ef-class-google-sign-in-button' },
                                                    { label: 'classroom', path: '/components/ef-class-google-classroom-button' }
                                                ]
                                            },
                                            { label: 'card', path: '/components/ef-class-card-button' }
                                        ]
                                    },
                                    { label: 'fab', path: '/components/ef-class-button-fab' },
                                    { label: 'mini fab', path: '/components/ef-class-button-minifab' },
                                    { label: 'raised', path: '/components/ef-class-button-raised' },
                                    { label: 'toggle', path: '/components/ef-class-toggle-button' ,
                                        children: [
                                            {
                                                label: 'toggle on', path: '/components/ef-class-toggle-on-button'
                                            }
                                        ]
                                    },

                                ]
                            },
                            { label: 'time', path: '/components/ef-class-time' },
                            { label: 'slider', path: '/components/ef-class-slider' },
                            { label: 'iframe', path: '/components/ef-class-iframe' },
                            { label: 'message box', path: '/components/ef-class-message-box' },
                            { label: 'mirror', path: '/components/ef-class-mirror' },
                            {
                                label: 'overlays',
                                children: [
                                    { label: 'color', path: '/components/ef-class-color-overlay' },
                                    { label: 'pop over', path: '/components/ef-class-pop-over' },
                                    { label: 'pop over container', path: '/components/ef-class-popover-container' }
                                ]
                            },
                            {
                                label: 'load indicators',
                                children: [
                                    { label: 'spinner', path: '/components/ef-class-load-spinner' }
                                ]
                            },
                            {
                                label: 'feedback',
                                children: [
                                    { label: 'block', path: '/components/ef-class-feedback-block' },
                                    { label: 'content', path: '/components/ef-class-content-feedback' }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'animations',
                        children: [
                            { label: 'animated svg', path: '/components/ef-class-animated-svg' }
                        ]
                    },
                    { 
                        label: 'forms',
                        children: [{
                            label: 'product',
                            children: [{
                                label: 'activity',
                                children: [
                                {
                                    label: 'Multiple choice activity form field',
                                    path: 'components/multiple-choice-activity-form-field' 
                                },
                                {
                                    label: 'Multiple choice activity',
                                    path: 'components/multiple-choice-activity' 
                                },
                                {
                                    label: 'Multiple choice item form field',
                                    path: 'components/multiple-choice-item-form-field'
                                },
                                {
                                    label: 'Multiple choice item',
                                    path: 'components/multiple-choice-item' 
                                },
                            ]
                            }, {
                                label: 'user',
                                children: [{
                                        label: 'preferences', path: '/components/ef-class-preferences-list-toggle-form-route',
                                        children: [
                                            {
                                                label: 'form-field', path: '/components/ef-class-preferences-list-toggle-form-field-route'
                                            }
                                        ]
                                    }]
                            }]
                        }]
                    },
                    {
                        label: 'layout',
                        children: [
                            { label: 'side nav', path: '/components/ef-class-sidenav-layout' },
                            { label: 'input errors', path: '/components/ef-class-input-errors-layout' },
                            { label: 'fixed header', path: '/components/ef-class-fixed-header-layout' },
                            { label: 'tabs', path: '/components/ef-class-tabs-layout' },
                            { label: 'page header', path: '/components/ef-class-page-header' },
                        ]
                    },
                    {
                        label: 'media',
                        children: [
                            {
                                label: 'image',
                                children: [
                                    { label: 'image', path: '/components/ef-class-image' },
                                    { label: 'fallback', path: '/components/ef-class-fallback-image' }
                                ]
                            },
                            { label: 'audio', path: '/components/ef-class-media-audio' },
                            { label: 'video', path: '/components/ef-class-media-video' },
                            { label: 'media controls', path: '/components/ef-class-media-controls' },
                        ]
                    },
                    // {
                        // label: 'features', path: '/feature',
                        // children: [{
                            // label: 'lesson Item Renderer',
                            // path: '/feature/lesson-item-renderer'
                        // }]

                    // },
                    {
                        label: 'product',
                        children: [{
                            label: 'activity',
                            children: [{
                                label: 'common',
                                children: [
                                    { label: 'prompt'          , path: '/components/ef-class-activity-prompt' } ,
                                    { label: 'review-mark'     , path: '/components/ef-class-activity-review-mark' } ,
                                    { label: 'response'        , path: '/components/ef-class-activity-response' },
                                    { label: 'item-index'      , path: '/components/ef-class-activity-item-index' },
                                    { label: 'revealed-answer' , path: '/components/ef-class-activity-revealed-answer' } ,
                                    {
                                        label: 'feedback'      ,
                                        children: [{
                                            label: 'message', path: '/components/ef-class-activity-feedback'
                                        }, {
                                            label: 'header', path: '/components/ef-class-activity-feedback-header'
                                        }]
                                    } ,
                                ]
                            }, {
                                label: 'free text',
                                children: [
                                    // { label: 'response'        , path: '/components/' },
                                    // { label: 'item'            , path: '/components/' },
                                    {
                                        label: 'short' , path: '/components/ef-class-free-text-short',
                                        children: [{
                                            label: 'item',
                                            path: '/components/ef-class-free-text-short-item'
                                        }, {
                                            label: 'response',
                                            path: '/components/ef-class-free-text-short-response'
                                        }]
                                    }, {
                                        label: 'long' , path: '/components/ef-class-free-text-long',
                                        children: [{
                                            label: 'item',
                                            path: '/components/ef-class-free-text-long-item'
                                        }, {
                                            label: 'response',
                                            path: '/components/ef-class-free-text-long-response'
                                        }]
                                    }
                                ]
                            },
                            {
                                label: 'highlighting', path: '/components/ef-class-highlighting-activity',
                                children: [
                                    {
                                        label: 'edit',
                                        path: '/components/ef-class-highlighting-activity'
                                    }, {
                                        label: 'assessment',
                                        path: '/components/ef-class-highlighting-activity-assessment'
                                    }
                                ]
                            }],
                        }, {
                            label: 'asset',
                            children: [
                                {
                                    label: 'image',
                                    children: [
                                        { label: 'image-thumbnail', path: '/components/ef-class-asset-image-thumbnail' },
                                        { label: 'image-maximised', path: '/components/ef-class-asset-image-maximised' },
                                        { label: 'zoom-image', path: '/components/ef-class-zoom-asset-image' },
                                        { label: 'image-background', path: '/components/ef-class-asset-image-background' },
                                    ]
                                },
                                {
                                    label: 'text',
                                    children: [
                                        { label: 'text-thumbnail', path: '/components/ef-class-asset-text-thumbnail' },
                                        { label: 'text-maximised', path: '/components/ef-class-asset-text-maximised' },
                                        { label: 'zoom-text', path: '/components/ef-class-zoom-asset-text' }
                                    ]
                                },
                                {
                                    label: 'video',
                                    children: [
                                        { label: 'video-thumbnail', path: '/components/ef-class-asset-video-thumbnail' },
                                        { label: 'video-maximised', path: '/components/ef-class-asset-video-maximised' },
                                        { label: 'zoom-video', path: '/components/ef-class-zoom-asset-video' }
                                    ]
                                },
                                {
                                    label: 'reference-material',
                                    children: [
                                        {
                                            label: 'reference-material-thumbnail',
                                            path: '/components/ef-class-asset-reference-material-thumbnail'
                                        },
                                        { label: 'zoom-reference-material', path: '/components/ef-class-zoom-reference-material' }
                                    ]
                                },
                                { label: 'audio', path: '/components/' }
                            ]
                        }, {
                            label: 'course',
                            children: [
                                { label: 'summary card 2'   , path: '/components/ef-class-course-summary-card-2' },
                                { label: 'grid'             , path: '/components/ef-class-course-grid' },
                                { label: 'header'           , path: '/components/ef-class-course-header' }
                            ],
                        }, {
                            label: 'lesson',
                            children: [
                                { label: 'splash screen'       , path: '/components/splash-screen'        }
                            ],
                        }, {
                            label: 'stimulus', path: '/components/ef-class-stimulus-list',
                        }, {
                            label: 'lesson plan',
                            children: [
                                { label: 'header'           , path: '/components/ef-class-lesson-plan-header'           } ,
                                { label: 'overview'           , path: '/components/ef-class-lesson-plan-overview'           } ,
                                { label: 'item-overview'      , path: '/components/ef-class-lesson-plan-item-overview'      } ,
                                { label: 'title'              , path: '/components/ef-class-lesson-plan-title'              } ,
                                { label: 'brief'              , path: '/components/ef-class-lesson-plan-brief'              } ,
                                { label: 'credits'            , path: '/components/ef-class-lesson-plan-credits'            } ,
                                { label: 'info'               , path: '/components/ef-class-lesson-plan-info'               } ,
                                { label: 'activities-counter' , path: '/components/ef-class-lesson-plan-activities-counter' } ,
                                { label: 'hero', path: '/components/ef-class-lesson-plan-hero'},
                                { label: 'card', path: '/components/ef-class-lesson-plan-card'},
                                { label: 'grid', path: '/components/ef-class-lesson-plan-grid'},
                                { label: 'group', path: '/components/ef-class-lesson-plan-group'},
                                { label: 'vocabulary', path: '/components/ef-class-lesson-plan-vocabulary'},
                                {
                                    label: 'teaching options',
                                    children: [
                                        { label: 'pop-over', path: '/components/teaching-options-pop-over'},
                                        { label: 'lesson-card-button', path: '/components/teaching-options-lesson-card-button'},
                                        { label: 'assignment-card-button', path: '/components/teaching-options-assignment-card-button'},
                                        { label: 'video-lesson-card-button', path: '/components/teaching-options-video-lesson-card-button'},
                                        { label: 'start-lesson',
                                            children: [
                                                { label: 'quickstart', path: '/components/quickstart-lesson-card-button'},
                                                { label: 'select-class', path: '/components/select-class-card-button'},
                                            ]
                                        }
                                    ]
                                }
                        ]
                        }, {
                            label: 'lesson item',
                            children: [
                                { label: 'instructions btn', path: '/components/ef-class-lesson-item-instructions-btn'},
                                { label: 'info title', path: '/components/ef-class-lesson-item-info-title'},
                                { label: 'state button', path: '/components/ef-class-lesson-item-state-btn'},
                                { label: 'selection btns', path: '/components/ef-class-lesson-item-selection-btns'},
                                { label: 'control bar', path: '/components/ef-class-lesson-item-control-bar'}
                            ]
                        }, {
                            label: 'my-library',
                            children: [
                                { label: 'header', path: '/components/ef-class-my-library-header' },
                                 { label: 'icon'           , path: '/components/ef-class-my-library-icon'           } ,
                                { label: 'lesson plan card', path: '/components/ef-class-my-library-lesson-plan-card'  },
                                { label: 'results', path: '/components/ef-class-my-library-results'  },
                            ]
                        },
                        {
                            label: 'Onboarding',
                            children: [
                                { label: 'help-instructions', path: '/components/help-instructions' },
                                { label: 'feature-instructions', path: '/components/ef-class-feature-instructions' },
                                { label: 'congratulations',
                                    children: [
                                        { label: 'modal', path: '/components/ef-class-congratulations-modal' },
                                        { label: 'animation', path: '/components/ef-class-congratulations-animation' }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'skill',
                            children: [
                                {label: 'skill header', path: '/components/ef-class-skill-header' }
                            ]
                        },
                        {
                            label: 'empty view', path: '/components/ef-class-empty-view'
                        },
                        {
                            label: 'user',
                            children: [
                                { label: 'avatar', path: '/components/ef-class-avatar'},
                                { label: 'preferences',
                                    children: [
                                        {label: 'item', path: './components/preferences-toggle'},
                                    ]
                                }
                            ]
                        }]
                    }, {
                        label: 'search',
                        children: [{
                            label: 'filters',
                            children: [
                                {
                                    label: 'pills',
                                    children: [
                                        { label: 'pills'           , path: '/components/ef-class-pills-filter'           },
                                        { label: 'pills group'     , path: '/components/ef-class-pills-filter-group'     }
                                    ]
                                }
                            ]
                        }]
                    }, {
                        label: 'Video Conference',
                        children: [{
                            label: 'Video Conference',
                            path: '/components/video-conference'
                        }, {
                            label: 'Stream',
                            path: '/components/video-conference-stream'
                        }, {
                            label: 'Participant',
                            path: '/components/video-conference-participant'
                        }, {
                            label: 'Participants',
                            path: '/components/video-conference-participants'
                        }]
                    }
                ]
            },
            {
                label: 'libraries',
                children: [
                    {
                        label: 'util',
                        path: 'libraries/util',
                        children: [{
                            label: 'Wired Windows',
                            path: 'libraries/util/wired-windows'
                        }]
                    } ,
                    { label: 'core'       , path: 'libraries/core'       } ,
                    { label: 'ng'         , path: 'libraries/ng'         } ,
                    { label: 'state'      , path: 'libraries/state'      } ,
                    {
                        label: 'features'   ,
                        path: 'libraries/features',
                        children: [{
                            label: 'Video Conference',
                            path: 'libraries/features/video-conference'
                        }]
                    } ,
                ]
            },
        ]
    }
};
