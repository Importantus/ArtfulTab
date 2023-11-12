import pkg from "../package.json";

const sharedManifest: Partial<chrome.runtime.ManifestBase> = {
  icons: {
    32: "icons/32.png",
    64: "icons/64.png",
    128: "icons/128.png",
    256: "icons/256.png",
    512: "icons/512.png",
  },
  permissions: [],
  chrome_url_overrides: {
    newtab: "src/entries/newTab/index.html"
  },
  browser_specific_settings: {
    gecko: {
      id: "artfultab@importantus.me"
    }
  }
};

const browserAction = {
  default_icon: {
    32: "icons/32.png",
    64: "icons/64.png",
    128: "icons/128.png",
    256: "icons/256.png",
    512: "icons/512.png",
  },
  default_popup: "src/entries/popup/index.html",
};

const ManifestV2 = {
  ...sharedManifest,
  browser_action: browserAction,
  permissions: [...sharedManifest.permissions],
};

const ManifestV3 = {
  ...sharedManifest,
  action: browserAction,
};

export function getManifest(manifestVersion: number): chrome.runtime.ManifestV2 | chrome.runtime.ManifestV3 {
  const manifest = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
  };

  if (manifestVersion === 2) {
    return {
      ...manifest,
      ...ManifestV2,
      manifest_version: manifestVersion,
    };
  }

  if (manifestVersion === 3) {
    return {
      ...manifest,
      ...ManifestV3,
      manifest_version: manifestVersion,
    };
  }

  throw new Error(
    `Missing manifest definition for manifestVersion ${manifestVersion}`
  );
}
