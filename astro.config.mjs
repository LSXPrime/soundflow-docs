import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://lsxprime.github.io/soundflow-docs',
	base: '/soundflow-docs',
	integrations: [
		starlight({
			title: 'SoundFlow Documentation',
			description: 'Documentation for the SoundFlow .NET Audio Engine',
			logo: {
				src: './src/assets/logo.svg',
				alt: 'SoundFlow Logo',
			},
			social: {
				github: 'https://github.com/LSXPrime/SoundFlow',
			},
			sidebar: [
				{
					label: 'Getting Started with SoundFlow',
					items: [
						{ label: 'Prerequisites', link: '/getting-started#prerequisites' },
						{
							label: 'Supported Operating Systems',
							link: '/getting-started#supported-operating-systems',
						},
						{ label: 'Installation', link: '/getting-started#installation' },
						{
							label: 'Option 1: Using the NuGet Package Manager (Recommended)',
							link: '/getting-started#option-1-using-the-nuget-package-manager-recommended',
						},
						{
							label: 'Option 2: Using the .NET CLI',
							link: '/getting-started#option-2-using-the-net-cli',
						},
						{
							label: 'Option 3: Building from Source',
							link: '/getting-started#option-3-building-from-source',
						},
						{ label: 'Basic Usage Example', link: '/getting-started#basic-usage-example' },
						{
							label: 'Code Explanation',
							link: '/getting-started#code-explanation',
						},
						{ label: 'Troubleshooting', link: '/getting-started#troubleshooting' },
						{ label: 'Next Steps', link: '/getting-started#next-steps' },
					],
				},
				{
					label: 'Core Concepts',
					items: [
						{ label: 'Audio Engine', link: '/core-concepts#audio-engine-audioengine' },
						{ label: 'Sound Components', link: '/core-concepts#sound-components-soundcomponent' },
						{ label: 'Mixer', link: '/core-concepts#mixer-mixer' },
						{ label: 'Sound Modifiers', link: '/core-concepts#sound-modifiers-soundmodifier' },
						{ label: 'Audio Playback', link: '/core-concepts#audio-playback-soundplayer-surroundplayer' },
						{ label: 'Audio Recording', link: '/core-concepts#audio-recording-recorder' },
						{ label: 'Audio Providers', link: '/core-concepts#audio-providers-isounddataprovider' },
						{ label: 'Audio Encoding/Decoding', link: '/core-concepts#audio-encodingdecoding-isoundencoder-isounddecoder' },
						{ label: 'Audio Analysis', link: '/core-concepts#audio-analysis-audioanalyzer' },
						{ label: 'Audio Visualization', link: '/core-concepts#audio-visualization-ivisualizer' },
						{ label: 'Visualization Context', link: '/core-concepts#visualization-context-ivisualizationcontext' },
						{ label: 'Editing Engine & Persistence', link: '/core-concepts#new-editing-engine-persistence-soundflowediting-soundfloweditingpersistence' },
					],
				},
				{
					label: 'Editing Engine & Persistence',
					items: [
						{ label: 'Core Editing Concepts', link: '/editing-engine#core-editing-concepts' },
						{ label: 'Composition', link: '/editing-engine#1-composition-soundfloweditingcomposition'},
						{ label: 'Track', link: '/editing-engine#2-track-soundfloweditingtrack'},
						{ label: 'AudioSegment', link: '/editing-engine#3-audiosegment-soundfloweditingaudiosegment'},
						{ label: 'Duration Calculations', link: '/editing-engine#duration-calculations'},
						{ label: 'Time Manipulation', link: '/editing-engine#time-manipulation'},
						{ label: 'Pitch-Preserved Time Stretching', link: '/editing-engine#pitch-preserved-time-stretching'},
						{ label: 'Classic Speed Control', link: '/editing-engine#classic-speed-control-varispeed'},
						{ label: 'Project Persistence', link: '/editing-engine#project-persistence-soundfloweditingpersistence'},
						{ label: 'Saving a Project', link: '/editing-engine#saving-a-project'},
						{ label: 'Loading a Project', link: '/editing-engine#loading-a-project'},
						{ label: 'Media Management & Relinking', link: '/editing-engine#media-management--relinking'},
						{ label: 'Dirty Flag (IsDirty)', link: '/editing-engine#dirty-flag-isdirty'},
						{ label: 'Examples in Action', link: '/editing-engine#examples-in-action'},
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Namespaces', link: '/api-reference#namespaces' },
						{
							label: 'Classes and Interfaces',
							items: [
								{ label: 'Abstracts', link: '/api-reference#abstracts' },
								{ label: 'Backends.MiniAudio', link: '/api-reference#backendsminiaudio' },
								{ label: 'Components', link: '/api-reference#components' },
								{ label: 'Editing', link: '/api-reference#editing' },
								{ label: 'Editing.Persistence', link: '/api-reference#editingpersistence' },
								{ label: 'Enums', link: '/api-reference#enums' },
								{ label: 'Exceptions', link: '/api-reference#exceptions' },
								{ label: 'Interfaces', link: '/api-reference#interfaces' },
								{ label: 'Modifiers', link: '/api-reference#modifiers' },
								{ label: 'Providers', link: '/api-reference#providers' },
								{ label: 'Utils', link: '/api-reference#utils' },
								{ label: 'Visualization', link: '/api-reference#visualization' },
							],
						},
						{ label: 'Full API Documentation', link: '/api-reference#detailed-class-and-interface-documentation-examples' },
					],
				},
				{
					label: 'Tutorials and Examples',
					items: [
						{
							label: 'Playback',
							items: [
								{ label: 'Basic Playback', link: '/tutorials-and-examples#1-basic-playback' },
								{ label: 'Web Playback', link: '/tutorials-and-examples#2-web-playback' },
								{ label: 'Playback Control', link: '/tutorials-and-examples#3-playback-control' },
								{ label: 'Looping', link: '/tutorials-and-examples#4-looping' },
								{ label: 'Surround Sound', link: '/tutorials-and-examples#5-surround-sound' },
								{ label: 'Efficient Playback with ChunkedDataProvider', link: '/tutorials-and-examples#6-efficient-playback-with-chunkeddataprovider' },
								{ label: 'Network Playback with NetworkDataProvider (Direct URL)', link: '/tutorials-and-examples#7-network-playback-with-networkdataprovider-direct-url' },
								{ label: 'Network Playback with NetworkDataProvider (HLS Playlist)', link: '/tutorials-and-examples#8-network-playback-with-networkdataprovider-hls-playlist' },
							],
						},
						{
							label: 'Recording',
							items: [
								{ label: 'Basic Recording', link: '/tutorials-and-examples#1-basic-recording' },
								{ label: 'Custom Processing', link: '/tutorials-and-examples#2-custom-processing' },
								{ label: 'VAD-based Recording', link: '/tutorials-and-examples#3-vad-based-recording' },
								{ label: 'Microphone Playback', link: '/tutorials-and-examples#4-microphone-playback' },
							],
						},
						{
							label: 'Effects',
							items: [
								{ label: 'Reverb', link: '/tutorials-and-examples#1-reverb' },
								{ label: 'Equalization', link: '/tutorials-and-examples#2-equalization' },
								{ label: 'Chorus and Delay', link: '/tutorials-and-examples#3-chorus-and-delay' },
								{ label: 'Compression', link: '/tutorials-and-examples#4-compression' },
								{ label: 'Noise Reduction', link: '/tutorials-and-examples#5-noise-reduction' },
								{ label: 'Mixing', link: '/tutorials-and-examples#6-mixing' },
							],
						},
						{
							label: 'Audio Editing & Persistence',
							items: [
								{ label: 'Creating a Basic Composition', link: '/tutorials-and-examples#audio-editing--persistence-new-section' },
								{ label: 'Full Guide', link: '/editing-engine' }
							]
						},
						{
							label: 'Advanced Voice Processing',
							link: '/tutorials-and-examples#advanced-voice-processing-with-webrtc-apm',
						},
						{
							label: 'Analysis',
							items: [
								{ label: 'Level Metering', link: '/tutorials-and-examples#1-level-metering' },
								{ label: 'Spectrum Analysis', link: '/tutorials-and-examples#2-spectrum-analysis' },
								{ label: 'Voice Activity Detection', link: '/tutorials-and-examples#3-voice-activity-detection' },
							],
						},
						{
							label: 'Visualization',
							items: [
								{ label: 'Level Meter', link: '/tutorials-and-examples#1-level-meter' },
								{ label: 'Waveform', link: '/tutorials-and-examples#2-waveform' },
								{ label: 'Spectrum Analyzer', link: '/tutorials-and-examples#3-spectrum-analyzer' },
								{ label: 'Integrating with UI Frameworks', link: '/tutorials-and-examples#integrating-with-ui-frameworks' },
							],
						},
					],
				},
				{
					label: 'Advanced Topics',
					items: [
						{
							label: 'Extending SoundFlow',
							items: [
								{ label: 'Custom Sound Components', link: '/advanced-topics#custom-sound-components' },
								{ label: 'Custom Sound Modifiers', link: '/advanced-topics#custom-sound-modifiers' },
								{ label: 'Custom Visualizers', link: '/advanced-topics#custom-visualizers' },
								{ label: 'Adding Audio Backends', link: '/advanced-topics#adding-audio-backends' },
							],
						},
						{ label: 'Performance Optimization', link: '/advanced-topics#performance-optimization' },
						{ label: 'Threading Considerations', link: '/advanced-topics#threading-considerations' },
					],
				},
				{
					label: 'Extensions',
					items: [
						{ label: 'WebRTC Audio Processing Module', link: '/extensions/webrtc-apm' },
					]
				}
			],
			editLink: {
				baseUrl: 'https://github.com/LSXPrime/soundflow-docs/edit/main/',
			},
			customCss: ['./src/styles/global.css'],
		}),
	]
});