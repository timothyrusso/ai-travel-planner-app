# Weather icon reference originals

Six weather glyphs, recoloured with the design-system palette, in the draw order
`CustomWeatherIcon` renders them.

**No bundler imports these files.** `react-native-svg-transformer` is wired into Metro only, while
the web Storybook runs `@storybook/react-native-web-vite`, which resolves a `.svg` import to a URL
string — the component would render blank there. The shipped artwork is therefore inline
`react-native-svg` `<Path>` data in
`features/core/design-system/components/basic/CustomWeatherIcon/CustomWeatherIcon.tsx`, and these
files exist so that artwork has a version-controlled original to be diffed against. Their `d` values
and fills match the component exactly; change both together or not at all.

| file | Iconify id |
| --- | --- |
| `sunny.svg` | `glyphs:sun-bold` |
| `partly-cloudy.svg` | `glyphs:cloudy-partly-bold` |
| `cloudy.svg` | `glyphs:cloud-1-bold` |
| `rain.svg` | `glyphs:rain-1-bold` |
| `snow.svg` | `glyphs:snow-bold` |
| `storm.svg` | `glyphs:lightning-bold` |

## Source

Iconify [`glyphs`](https://github.com/gorango/glyphs) set, `-bold` (solid) weight, by Goran
Spasojevic. All six are natively `viewBox="0 0 80 80"`, so they share one grid and one weight; only
the `fill` values were changed.

## License

```
MIT License

Copyright (c) 2018

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
