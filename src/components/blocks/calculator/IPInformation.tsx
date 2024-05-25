import { FormEventHandler, useState } from 'react';
import { isIPv4 } from 'is-ip';

import { calculateIPInfo, IPInfo } from '../../../utils';
import { Input } from '../../ui';

import { IPInfoTable } from './IPInfoTable';

export const IPInformation = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [mask, setMask] = useState('');
  const [error, setError] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!ipAddress || !mask) {
      return;
    }
    if (!isIPv4(ipAddress) || Number(mask) < 1 || Number(mask) > 31) {
      setError('input IP or mask is not correct');
      return;
    }
    setError('');
    const result = calculateIPInfo(ipAddress, mask);
    setIpInfo(result);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="mb-4">
        <div className="flex items-end mb-1">
          <Input
            value={ipAddress}
            onChange={setIpAddress}
            name="ip-address"
            label="Address (Host or Network)"
          />
          <span className="mb-0.5">&nbsp;/&nbsp;</span>
          <Input
            value={mask}
            onChange={setMask}
            name="netmask"
            label="Netmask"
          />
        </div>
        <button className="border" type="submit">
          Calculate!
        </button>
      </form>

      {error && <p>{error}</p>}

      {ipInfo && <IPInfoTable ipInfo={ipInfo} />}
    </div>
  );
};