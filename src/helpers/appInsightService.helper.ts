import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

class AppInsightService {
  private reactPlugin: ReactPlugin;
  private appInsights: any;

  constructor() {
    this.reactPlugin = new ReactPlugin();
  }

  public init(cfgObj: object) {
    const INSTRUMENTATION_KEY =
      process.env.REACT_APP_INSIGHT_INSTRUMENTATION_KEY || '';

    if (INSTRUMENTATION_KEY === '') {
      return false;
    }

    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: INSTRUMENTATION_KEY,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        extensions: [this.reactPlugin],
        extensionConfig: {
          [this.reactPlugin.identifier]: cfgObj
        }
      }
    });
    this.appInsights.loadAppInsights();
  }
}

export let ai = new AppInsightService();
